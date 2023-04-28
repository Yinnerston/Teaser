"""
Extract daily top reddit submissions for each subreddit in ALL_CATEGORIES_TEMP.
Call this script in the manage.py shell from src/teaser (/app in docker container)
"""
import praw

# import pmaw
import sentry_sdk

import logging

from scripts.etl_utils import *
from core.services.post_service import etl_post_service
from core.utils.user_profile_validator import ALL_CATEGORIES_TEMP
import core.utils.sanitization_utils as sanitization_utils
from django.db import DatabaseError
from yt_dlp import YoutubeDL
import os


class RedditETL:
    """
    Class that ingests data from reddit and puts it into the PostsModel db table.
    Designated ETL video data stored in /app/data
    """

    # CACHE_DIR = "./cache"

    # Dict mapping
    ACCEPTED_FIELDS = [
        "title",
        "score",
        "url",
        "subreddit",
        "created_utc",
        "domain",
        "id",
        "thumbnail",
    ]

    SUBMISSION_MAP = {
        "title": (getattr, "title"),
        "score": (getattr, "score"),
        "url": (getattr, "url"),
        "created_utc": (unix_timestamp_getattr, "created_utc"),
        "domain": (getattr, "domain"),
        "id": (getattr, "id"),
        "thumbnail": (getattr, "thumbnail"),
    }

    def __init__(self, testing=False):
        if not testing:
            logging.basicConfig(
                filename="log/reddit_etl.log",
                encoding="utf-8",
                level=logging.DEBUG,
                format="%(asctime)s %(message)s",
            )

        # Auth information is contained in praw.ini file. See setup.md
        self.reddit = praw.Reddit("TeaserScript")
        self.reddit.read_only = True

        sentry_sdk.init(
            dsn="https://ef5d88ef4fe1411f8a626d67f8ee3317@o4504333010731009.ingest.sentry.io/4504365878673408",
            # Set traces_sample_rate to 1.0 to capture 100%
            # of transactions for performance monitoring.
            # We recommend adjusting this value in production.
            traces_sample_rate=1.0,
        )

    def _load_submission(self, category: str, us_submission: praw.models.Submission):
        """
        Build dictionary that applies map_func to each value.
        """
        # Only take submissions in input
        if type(us_submission) is not praw.models.Submission:
            sentry_sdk.capture_message(
                "Attempted to load non praw.models.Submission type in "
                + self.__class__.__name__
                + "with"
                + self.__class__._load_submission.__name__
                + str(us_submission)
            )
            return {}
        obj = None
        try:
            # Validate data
            s_title = sanitization_utils.sanitize_str(us_submission.title)
            s_url = sanitization_utils.sanitize_str(us_submission.url)
            s_score = us_submission.score
            # s_domain = sanitization_utils.sanitize_str(us_submission["domain"])
            s_reddit_id = sanitization_utils.sanitize_str(us_submission.id)
            # s_thumbnail = sanitization_utils.sanitize_str(us_submission["thumbnail"])

            # use yt-dlp to stream the video to UploadedFile / temporary file?
            ydl_opts = {"outtmpl": {"default": "/app/data/%(title)s.%(ext)s"}}
            with YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(s_url, download=False)
                download = ydl.download([s_url])
                with open(
                    os.path.join("/app/data", f"{info['title']}.{info['ext']}"), "rb"
                ) as us_file:
                    etl_post_service(
                        s_description=s_title,
                        s_reddit_id=s_reddit_id,
                        s_score=s_score,
                        s_post_data={"data": {"categories": [category]}},
                        us_file=us_file,
                    )
        # TODO: these depend on etl_post_service
        except DatabaseError as e:
            # Expected behaviour for a invalid post is to report , ignore it and add subsequent posts
            sentry_sdk.capture_exception(e)
            logging.error("Database Error:", e)
        except DomainException as domain_exception:
            logging.info("Invalid Domain:", domain_exception)
        except Exception as e:
            sentry_sdk.capture_exception(e)
            logging.error("Exception:", e)
        else:
            logging.info("Added Post: %s", obj)
        return obj

    def _transform_top_submissions(self, category, top_submissions):
        """
        Only allow redgifs videos
        Apply transformation to each submission in top_submissions.
        Then load them into django postgres db.
        """
        transformed_submissions = [
            self._load_submission(category, submission)
            for submission in top_submissions
            if "redgifs" in submission.domain
        ]
        return transformed_submissions

    def run_pipeline(self):
        """
        Extracts the top 50 submissions from each subreddit in ALL_CATEGORIES_TEMP.values()
        """

        # Iterate over subreddits
        for category, subreddit in ALL_CATEGORIES_TEMP.items():
            top_submissions = []
            if subreddit == "":
                continue
            try:
                # Get top N submissions daily from each subreddit in the list
                top_submissions = self.reddit.subreddit(subreddit).top(
                    time_filter="day", limit=50
                )

                self._transform_top_submissions(category, top_submissions)
            except praw.exceptions.PRAWException as err:
                # On error, report to Sentry
                sentry_sdk.capture_exception(err)


# Considerations:
# Failure recovery --> Responses are cached, should I retry until finished?
# What about rate limits?
