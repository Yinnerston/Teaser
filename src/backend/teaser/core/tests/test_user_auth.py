from django.test import TestCase
from core.services.user_auth_services import register_user_service
from core.errors.user_auth_errors import (
    PatternMatchValidationError,
    UserAlreadyExistsValidationError,
    TermsOfServiceNotAcceptedValidationError,
    InvalidDOBValidationError,
)
from core.models.user_auth_models import TeaserUserModel
from django.contrib.auth.models import User
from datetime import datetime
from dateutil.relativedelta import relativedelta


class TestUserAuthRegisterService(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.register_data = {
            "username": "testuser1",
            "email": "testuser1@tester.com",
            "phone": "+61499499499",
            "password": "SomeTestPassword1!",
            "dob": "21/12/1995",
            "terms_of_service_accepted": True,
        }

    def test_register_username_invalid_length(self):
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                "X" * 33,
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                "Y" * 5,
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_username_invalid_characters(self):
        """
        Test registration with invalid username input.
        """
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                "😀🤣kms🙃🙃",
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                "<Script src=sussy>",
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_username_uniqueness(self):
        """
        Check that duplicating a register user raises an exception.
        """
        register_user_service(
            TestUserAuthRegisterService.register_data["username"],
            TestUserAuthRegisterService.register_data["email"],
            TestUserAuthRegisterService.register_data["phone"],
            TestUserAuthRegisterService.register_data["password"],
            TestUserAuthRegisterService.register_data["dob"],
            TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
        )
        # Check user has been created
        self.assertEquals(User.objects.count(), 1)
        self.assertEquals(TeaserUserModel.objects.count(), 1)
        # Duplicate user username
        with self.assertRaises(UserAlreadyExistsValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                "isolateUsername@gmail.com",
                "+61415799799",
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 1)
        self.assertEquals(TeaserUserModel.objects.count(), 1)

    def test_register_username_normalisation(self):
        """
        TODO: Probably for email as well
        """
        pass

    def test_register_email_invalid_length(self):
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                "A" * 255 + "@gmail.com",
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_email_invalid_pattern(self):
        """
        Test emails must have a valid domain pattern
        """
        # Requires "@text.text" --> Missing . for email domain
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                "Test" + "@gmail",
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)
        # Invalid characters in email
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                "🤡🤡🤡" + "@gmail.com",
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_email_uniqueness(self):
        """
        Test emails are unique
        """
        register_user_service(
            TestUserAuthRegisterService.register_data["username"],
            TestUserAuthRegisterService.register_data["email"],
            TestUserAuthRegisterService.register_data["phone"],
            TestUserAuthRegisterService.register_data["password"],
            TestUserAuthRegisterService.register_data["dob"],
            TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
        )
        # Check user has been created
        self.assertEquals(User.objects.count(), 1)
        self.assertEquals(TeaserUserModel.objects.count(), 1)
        # Duplicate user email
        with self.assertRaises(UserAlreadyExistsValidationError):
            register_user_service(
                "isolateUsername",
                TestUserAuthRegisterService.register_data["email"],
                "+61415799799",
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 1)
        self.assertEquals(TeaserUserModel.objects.count(), 1)

    def test_register_phone_invalid_length(self):
        """
        Test phone numbers must be of valid length
        """
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                "+61415415415415415415",
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_phone_invalid_pattern(self):
        """
        Test country codes must be in a phone number
        """
        # Missing country code
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                "0415466466",
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_phone_number_uniqueness(self):
        """
        Test phone numbers are unique
        """
        register_user_service(
            TestUserAuthRegisterService.register_data["username"],
            TestUserAuthRegisterService.register_data["email"],
            TestUserAuthRegisterService.register_data["phone"],
            TestUserAuthRegisterService.register_data["password"],
            TestUserAuthRegisterService.register_data["dob"],
            TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
        )
        # Check user has been created
        self.assertEquals(User.objects.count(), 1)
        self.assertEquals(TeaserUserModel.objects.count(), 1)
        # Duplicate user phone
        with self.assertRaises(UserAlreadyExistsValidationError):
            register_user_service(
                "someOtherUser",
                "isolateUsername@gmail.com",
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 1)
        self.assertEquals(TeaserUserModel.objects.count(), 1)

    def test_register_dob_invalid_pattern(self):
        """
        Test that only the %d/%m/%Y dob format is accepted
        """
        # Try abbreviated year: Requires %d/%m/%Y
        with self.assertRaises(InvalidDOBValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                "01/01/94",
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)
        # Try verbose: Requires %d/%m/%Y
        with self.assertRaises(InvalidDOBValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                "January 1st 1994",
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)
        # Try UTC: Requires %d/%m/%Y
        with self.assertRaises(InvalidDOBValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                "915148800.75",
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_dob_invalid_age(self):
        """
        Test underage clients cannot register
        """
        # get the date a week ago in the format %d/%m/%Y
        last_week = datetime.today() - relativedelta(days=7)
        last_week_str = last_week.strftime("%d/%m/%Y")
        with self.assertRaises(InvalidDOBValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                last_week_str,
                TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_terms_of_service_accepted(self):
        """
        Test terms of service was accepted.
        """
        with self.assertRaises(TermsOfServiceNotAcceptedValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
                TestUserAuthRegisterService.register_data["password"],
                TestUserAuthRegisterService.register_data["dob"],
                False,
            )
