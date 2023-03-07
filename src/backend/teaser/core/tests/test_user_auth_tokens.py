from django.test import TestCase
from core.services.user_auth_services import register_user_service, login_user_service
from core.models.user_auth_models import AuthTokenModel, TeaserUserModel


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
        cls.test_user = register_user_service(
            TestUserAuthRegisterService.register_data["username"],
            TestUserAuthRegisterService.register_data["email"],
            TestUserAuthRegisterService.register_data["phone"],
            TestUserAuthRegisterService.register_data["password"],
            TestUserAuthRegisterService.register_data["dob"],
            TestUserAuthRegisterService.register_data["terms_of_service_accepted"],
        )

    def test_auth_token_creation_on_login(self):
        """
        Login a user and test that a token has been generated
        """
        response = self.client.post(
            "/api/v1/login",
            data={
                "username": TestUserAuthRegisterService.register_data["username"],
                "password": TestUserAuthRegisterService.register_data["password"],
            },
            content_type="application/json",
        )
        self.assertEquals(response.status_code, 200)
        # Check the Auth token model has been created
        self.assertEquals(AuthTokenModel.objects.count(), 1)
        login_auth_token = AuthTokenModel.objects.first()
        login_teaser_user = TeaserUserModel.objects.first()
        self.assertEquals(login_auth_token.teaser_user_id, login_teaser_user)
