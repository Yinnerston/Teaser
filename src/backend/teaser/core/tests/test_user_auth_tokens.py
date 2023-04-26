from django.test import TestCase
from core.services.user_auth_services import register_user_service, login_user_service
from core.models.user_auth_models import AuthTokenModel, TeaserUserModel
from core.utils.user_auth_token_utils import check_and_get_valid_auth_token
from datetime import datetime, timedelta
from pytz import UTC


class TestUserAuthTokenService(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.register_data = {
            "username": "testuser1",
            "phone": "+61499499499",
            "password": "SomeTestPassword1!",
            "dob": "21/12/1995",
            "terms_of_service_accepted": True,
        }
        cls.test_user = register_user_service(
            TestUserAuthTokenService.register_data["username"],
            TestUserAuthTokenService.register_data["phone"],
            TestUserAuthTokenService.register_data["password"],
            TestUserAuthTokenService.register_data["dob"],
            TestUserAuthTokenService.register_data["terms_of_service_accepted"],
        )

    def test_auth_token_creation_on_login(self):
        """
        Login a user and test that a token has been generated
        """
        response = self.client.post(
            "/api/v1/login",
            data={
                "username": TestUserAuthTokenService.register_data["username"],
                "password": TestUserAuthTokenService.register_data["password"],
            },
            content_type="application/json",
        )
        self.assertEquals(response.status_code, 200)
        # Check the Auth token model has been created
        self.assertEquals(AuthTokenModel.objects.count(), 1)
        login_auth_token = AuthTokenModel.objects.first()
        login_teaser_user = TeaserUserModel.objects.first()
        self.assertEquals(login_auth_token.teaser_user_id, login_teaser_user)

    def test_token_invalidated_on_logout(self):
        # Login user
        login_response = self.client.post(
            "/api/v1/login",
            data={
                "username": TestUserAuthTokenService.register_data["username"],
                "password": TestUserAuthTokenService.register_data["password"],
            },
            content_type="application/json",
        )
        self.assertEquals(login_response.status_code, 200)
        # Check token is valid
        self.assertEquals(AuthTokenModel.objects.count(), 1)
        login_auth_token = AuthTokenModel.objects.first()
        self.assertTrue(login_auth_token.is_valid)
        # Logout user
        auth_header = {
            "HTTP_AUTHORIZATION": "Bearer " + login_auth_token.token_hash,
        }
        logout_response = self.client.post(
            "/api/v1/logout", data={}, content_type="application/json", **auth_header
        )
        self.assertEquals(logout_response.status_code, 200)
        # Check token is no longer valid
        login_auth_token.refresh_from_db()
        self.assertFalse(login_auth_token.is_valid)

    def test_multiple_refresh_tokens(self):
        first_login_response = self.client.post(
            "/api/v1/login",
            data={
                "username": TestUserAuthTokenService.register_data["username"],
                "password": TestUserAuthTokenService.register_data["password"],
            },
            content_type="application/json",
        )
        self.assertEquals(first_login_response.status_code, 200)
        second_login_response = self.client.post(
            "/api/v1/login",
            data={
                "username": TestUserAuthTokenService.register_data["username"],
                "password": TestUserAuthTokenService.register_data["password"],
            },
            content_type="application/json",
        )
        self.assertEquals(second_login_response.status_code, 200)
        self.assertEquals(AuthTokenModel.objects.count(), 2)
        auth_token_objects = list(AuthTokenModel.objects.all())
        for auth_token in auth_token_objects:
            self.assertTrue(auth_token.is_valid)
            auth_header = {
                "HTTP_AUTHORIZATION": "Bearer " + auth_token.token_hash,
            }
            logout_response = self.client.post(
                "/api/v1/logout",
                data={},
                content_type="application/json",
                **auth_header
            )
            self.assertEquals(logout_response.status_code, 200)
            modified_token = AuthTokenModel.objects.get(
                token_hash=auth_token.token_hash
            )
            self.assertFalse(modified_token.is_valid)

    def test_token_expiry_date_reached(self):
        login_response = self.client.post(
            "/api/v1/login",
            data={
                "username": TestUserAuthTokenService.register_data["username"],
                "password": TestUserAuthTokenService.register_data["password"],
            },
            content_type="application/json",
        )
        self.assertEquals(login_response.status_code, 200)
        # Set token's expiry date to yesterday
        login_auth_token = AuthTokenModel.objects.first()
        login_auth_token.expiry_date = UTC.localize(datetime.now() - timedelta(days=1))
        login_auth_token.save()
        # Logout response requires authorization.
        # Test that token invalid from 401 status code
        auth_header = {
            "HTTP_AUTHORIZATION": "Bearer " + login_auth_token.token_hash,
        }
        logout_response = self.client.post(
            "/api/v1/logout", data={}, content_type="application/json", **auth_header
        )
        self.assertEquals(logout_response.status_code, 401)
