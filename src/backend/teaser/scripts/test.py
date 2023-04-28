# """
# Test cases for reddit_etl.py script.
# """
# from django.test import TestCase
# from django.db.models import ForeignKey
# from .reddit_etl import RedditETL
# from reddit.models import Author, Subreddit, Submission
# import httpretty
# import praw
# import sentry_sdk


# class RedditETLTest(TestCase):
#     """
#     Testing ETL process
#     """

#     def setUp(self):
#         """
#         Called automatically on startup by django test framework.
#         """
#         # Note: This persists across tests
#         self.instance = RedditETL()
#         # Disable sending error messages to sentry whilst testing
#         sentry_sdk.init(dsn="")

#     def get_example_submission(self):
#         """
#         Returns a single example submission in the format returned by the
#         praw.Subreddit.top function
#         """
#         reddit = self.instance.reddit
#         # Example on a different subreddit
#         # self.instance.reddit.submission("zvms2j")
#         return reddit.submission(id="zvly7g")

#     @httpretty.activate(verbose=True, allow_net_connect=False)
#     def mock_reddit_top_submissions(self):
#         # TODO: Mock for each subreddit
#         httpretty.register_uri(
#             httpretty.GET,
#             "https://",  # reddit.json for top submissions
#             body="{...}",  # TODO:
#         )

#     def test_load_submission_valid_submission(self):
#         """
#         Test that a valid submission is loaded into the database.
#         """
#         submission = self.get_example_submission()

#         # Load submission into db
#         loaded_submission = self.instance._load_submission(submission)
#         saved_author = Author.objects.get(name=submission.author.name)
#         saved_subreddit = Subreddit.objects.get(name=submission.subreddit.display_name)
#         saved_submission = Submission.objects.get(id=submission.id)
#         # Check that Author is in database
#         self.assertTrue(saved_author)
#         # Check that Subreddit is in database
#         self.assertTrue(saved_subreddit)
#         # Check that submission is in database
#         self.assertTrue(saved_submission)
#         # Check that the fields are correct
#         self.assertEqual(saved_author.name, loaded_submission.author.name)
#         self.assertEqual(saved_subreddit.name, submission.subreddit.display_name)
#         # Not iterating over fields because possiblility of post being edited
#         # + data format (default values) changing over time
#         self.assertEquals(submission.title, saved_submission.title)
#         # TODO: Test fields that undergo transformation in reddit_etl

#         # for field in Submission._meta.get_fields():
#         #     field_name = field.name
#         #     field_value = getattr(saved_submission, field_name)
#         #     attr_name_before_map = self.instance.SUBMISSION_MAP[field_name][1]

#         #     if isinstance(field, ForeignKey):
#         #         # Foreign keys
#         #         if field_name == "author":
#         #             self.assertEquals(
#         #                 field_value, author_getattr(submission, field_name)
#         #             )
#         #         elif field_name == "subreddit":
#         #             self.assertEquals(
#         #                 field_value, subreddit_getattr(submission, field_name)
#         #             )
#         #     elif field_name == attr_name_before_map:
#         #         # Field names in Submission is the same as returned by praw
#         #         self.assertEquals(field_value, getattr(submission, field_name))
#         #     else:
#         #         # Field name is different
#         #         self.assertEquals(
#         #             field_value, getattr(submission, attr_name_before_map)
#         #         )

#     def test_load_submission_submission_is_none(self):
#         submission = None  # Some invalid submission
#         # Load submission into db
#         loaded_submission = self.instance._load_submission(submission)
#         self.assertEquals(loaded_submission, {})
#         # Check that Author is not in database
#         self.assertEquals(Author.objects.count(), 0)
#         # Check that Subreddit is not in database
#         self.assertEquals(Subreddit.objects.count(), 0)
#         # Check that submission is not in database
#         self.assertEquals(Submission.objects.count(), 0)

#     def test_load_submission_same_author_different_subreddits(self):
#         """
#         Test author isn't duplicated in db when two different submissions with the same
#         author are added.
#         """
#         # Add two submissions by the same user on different subreddits
#         # To the database
#         submission = self.instance.reddit.submission("zvms2j")
#         duplicate_author_submission = self.get_example_submission()
#         submission_loaded_first = self.instance._load_submission(submission)
#         submission_loaded_second = self.instance._load_submission(
#             duplicate_author_submission
#         )
#         # Check that there's only one author saved
#         self.assertTrue(Author.objects.get(name=submission.author))
#         self.assertEquals(Author.objects.count(), 1)
#         # Check that there are two subreddits saved
#         self.assertTrue(Subreddit.objects.get(name=submission.subreddit))
#         self.assertTrue(
#             Subreddit.objects.get(name=duplicate_author_submission.subreddit)
#         )
#         self.assertEquals(Subreddit.objects.count(), 2)
#         # Check that there are two submissions saved
#         self.assertTrue(Submission.objects.get(id=submission.id))
#         self.assertTrue(Submission.objects.get(id=duplicate_author_submission.id))
#         self.assertEquals(Submission.objects.count(), 2)

#     def test_load_submission_different_author_same_subreddit(self):
#         """
#         Test subreddit isn't duplicated in db when two different submissions with the same
#         subreddit are added.
#         """
#         submission = self.instance.reddit.submission("zvms2j")
#         different_author_same_subreddit_submission = self.instance.reddit.submission(
#             "zvn17h"
#         )
#         submission_loaded_first = self.instance._load_submission(submission)
#         submission_loaded_second = self.instance._load_submission(
#             different_author_same_subreddit_submission
#         )
#         # Check there are two distinct authors
#         self.assertTrue(Author.objects.get(name=submission.author))
#         self.assertTrue(
#             Author.objects.get(name=different_author_same_subreddit_submission.author)
#         )
#         self.assertEquals(Author.objects.count(), 2)
#         # Check there's only one subreddit saved
#         self.assertTrue(Subreddit.objects.get(name=submission.subreddit))
#         self.assertEquals(Subreddit.objects.count(), 1)
#         # Check there's two submissions
#         self.assertTrue(Submission.objects.get(id=submission.id))
#         self.assertEquals(Submission.objects.count(), 2)

#     def test_load_submission_duplicate_submission(self):
#         """
#         Check that the same submission loaded twice, only loads into the database once without duplication.
#         """
#         submission = self.get_example_submission()
#         # Load same submission twice using _load_submission
#         self.instance._load_submission(submission)
#         self.instance._load_submission(submission)
#         # Check that only one Author, Subreddit, Submission has been loaded
#         self.assertTrue(Author.objects.get(name=submission.author))
#         self.assertEquals(Author.objects.count(), 1)
#         self.assertTrue(Subreddit.objects.get(name=submission.subreddit))
#         self.assertEquals(Subreddit.objects.count(), 1)
#         self.assertTrue(Submission.objects.get(id=submission.id))
#         self.assertEquals(Subreddit.objects.count(), 1)

#     def test_duplicate_pk_unchanging_attribute_values(self):
#         """
#         Test post with duplicate PK with an different unchanging attribute value is idempotent.
#         Test no error is produced on insertion of duplicate pk, with changed value(s).
#         """
#         submission = self.get_example_submission()
#         # Title cannot be updated
#         submission_title = submission.title
#         # Load submission into db
#         loaded_submission = self.instance._load_submission(submission)
#         # Check that only one Author, Subreddit, Submission has been loaded
#         self.assertTrue(Author.objects.get(name=submission.author))
#         self.assertEquals(Author.objects.count(), 1)
#         self.assertTrue(Subreddit.objects.get(name=submission.subreddit))
#         self.assertEquals(Subreddit.objects.count(), 1)
#         first_get = Submission.objects.get(id=submission.id)
#         self.assertTrue(first_get)
#         self.assertEquals(submission_title, first_get.title)
#         self.assertEquals(Subreddit.objects.count(), 1)
#         # Attempt to change a field, then load same submission
#         submission.title = "invalid title"
#         # Nothing should be changed in the db
#         loaded_submission = self.instance._load_submission(submission)
#         self.assertTrue(Author.objects.get(name=submission.author))
#         self.assertEquals(Author.objects.count(), 1)
#         self.assertTrue(Subreddit.objects.get(name=submission.subreddit))
#         self.assertEquals(Subreddit.objects.count(), 1)
#         second_get = Submission.objects.get(id=submission.id)
#         self.assertEquals(first_get, second_get)
#         self.assertEquals(submission_title, second_get.title)
#         self.assertEquals(first_get.title, second_get.title)
#         self.assertEquals(Subreddit.objects.count(), 1)

#     def test_load_submission_EOM(self):
#         """
#         Test the behaviour when posts is too large to fit into memory
#         """
#         # TODO:
#         pass

#     def test_load_submission_invalid_map_func_atomic_commit(self):
#         """
#         Test that loading invalid models doesn't work.
#         Test that the one atempted invalid insertion doesn't break the functionality.
#         Test atomic commit
#         """
#         # Define some invalid function
#         class InvalidSubmission(praw.models.Submission):
#             def __init__(self, invalid_attr) -> None:
#                 self.invalid_attr = invalid_attr
#                 self.title = "invalid"

#             def __getattribute__(self, __name: str):
#                 raise Exception("Always raises exception")

#             def __str__(self) -> str:
#                 return self.invalid_attr

#         post = self.get_example_submission()

#         # Expected behaviour is
#         invalid_obj = InvalidSubmission("invalid_attr")
#         try:
#             self.instance._load_submission(invalid_obj)
#         except Exception:
#             pass
#         # Check that invalid model hasn't been loaded
#         # Author, Subreddit, Submission should be added in one transaction
#         self.assertEquals(Author.objects.count(), 0)
#         self.assertEquals(Subreddit.objects.count(), 0)
#         self.assertEquals(Submission.objects.count(), 0)
#         # Check that you can still perform valid inserts after failure
#         self.instance._load_submission(post)
#         self.assertEquals(Author.objects.count(), 1)
#         self.assertEquals(Subreddit.objects.count(), 1)
#         self.assertEquals(Subreddit.objects.count(), 1)

#     def test_transform_top_submissions_valid_input(self):
#         """
#         Given a valid input from Reddit.top_submissions, correctly
#         """
#         ids = [
#             "t3_zvn17h",
#             "t3_zvms2j",
#             "t3_zvmrlj",
#         ]
#         test_data = self.instance.reddit.info(ids)
#         transformed = self.instance._transform_top_submissions(test_data)
#         self.assertEquals(Author.objects.count(), 2)
#         self.assertEquals(Subreddit.objects.count(), 1)
#         self.assertEquals(Submission.objects.count(), 3)

#     def test_update_score(self):
#         """
#         Load a submission, change the score of the submission and attempt to load it again.
#         Test that the score has been changed in the Submission.
#         """
#         submission = self.instance.reddit.submission("zvn17h")
#         output_submission = self.instance._load_submission(submission)
#         # Check that score matches
#         self.assertEquals(submission.score, output_submission.score)
#         # Reload with changed score
#         submission.score = 99999
#         second_output_submission = self.instance._load_submission(submission)
#         self.assertEquals(submission.score, second_output_submission.score)
#         # Get id of submission
#         final_output = Submission.objects.get(id=submission.id)
#         self.assertEquals(final_output.score, submission.score)
