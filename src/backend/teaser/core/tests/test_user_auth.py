from django.test import TestCase
from core.services.user_auth_services import register_user_service
from core.errors.user_auth_errors import (
    PatternMatchValidationError,
    UserAlreadyExistsValidationError,
)
from copy import deepcopy
from core.models.user_auth_models import TeaserUserModel
from django.contrib.auth.models import User


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
        invalid_data = deepcopy(TestUserAuthRegisterService.register_data)
        invalid_data["username"] = "X" * 33
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                invalid_data["username"],
                invalid_data["email"],
                invalid_data["phone"],
                invalid_data["password"],
                invalid_data["dob"],
                invalid_data["terms_of_service_accepted"],
            )
        # Check that no user has been created
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)
        invalid_data["username"] = "Y" * 5
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                invalid_data["username"],
                invalid_data["email"],
                invalid_data["phone"],
                invalid_data["password"],
                invalid_data["dob"],
                invalid_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

    def test_register_username_invalid_characters(self):
        """
        Test registration with invalid username input.
        """
        invalid_data = deepcopy(TestUserAuthRegisterService.register_data)
        invalid_data["username"] = "😀🤣kms🙃🙃"
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                invalid_data["username"],
                invalid_data["email"],
                invalid_data["phone"],
                invalid_data["password"],
                invalid_data["dob"],
                invalid_data["terms_of_service_accepted"],
            )
        self.assertEquals(User.objects.count(), 0)
        self.assertEquals(TeaserUserModel.objects.count(), 0)

        invalid_data["username"] = "<Script src=sussy>"
        with self.assertRaises(PatternMatchValidationError):
            register_user_service(
                invalid_data["username"],
                invalid_data["email"],
                invalid_data["phone"],
                invalid_data["password"],
                invalid_data["dob"],
                invalid_data["terms_of_service_accepted"],
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
        # Duplicate user
        with self.assertRaises(UserAlreadyExistsValidationError):
            register_user_service(
                TestUserAuthRegisterService.register_data["username"],
                TestUserAuthRegisterService.register_data["email"],
                TestUserAuthRegisterService.register_data["phone"],
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
        pass

    def test_register_email_invalid_pattern(self):
        pass

    def test_register_email_uniqueness(self):
        pass

    def test_register_phone_invalid_length(self):
        pass

    def test_register_phone_invalid_pattern(self):
        pass

    def test_register_phone_duplicate_phone(self):
        pass

    def test_register_dob_invalid_length(self):
        pass

    def test_register_dob_invalid_pattern(self):
        pass

    def test_register_dob_invalid_age(self):
        pass

    def test_register_terms_of_service_accepted(self):
        pass
