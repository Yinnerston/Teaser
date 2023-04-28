"""
Deprecasted by reddit management command.
"""

from scripts.reddit_etl import RedditETL
import logging

logging.basicConfig(
    filename="/app/teaser/log/reddit_etl.log",
    encoding="utf-8",
    level=logging.INFO,
    format="%(asctime)s %(message)s",
)


with open("/app/log/reddit_etl.log", "a") as etl_log:
    etl_log.write("Starting ETL:\n")

    RedditETL().run_pipeline()
