"""teaser URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from ninja import NinjaAPI
from bleach import clean

# Import services
from core.services.user_auth_services import register_user_service

# Import schemas
from core.schemas.user_auth_schemas import TeaserUserSchema

# Basic Sanitizers
from core.utils import sanitization_utils

api = NinjaAPI()


# Define API urls here
@api.post("register")
def register_user_endpoint(request, payload: TeaserUserSchema):
    """
    Register user endpoint.
    Try it out:
    curl -X POST -d '{"username": "", "password":"", "email":"", "phone":"", "dob":"", "terms_of_service_accepted":true}' http://localhost:8000/api/v1/register
    TODO: Restrict permission for AccountCreation?
    """
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_username = teaser_user_dict["username"]
    us_email = teaser_user_dict["email"]
    us_phone = teaser_user_dict["phone"]
    us_password = teaser_user_dict["password"]
    us_dob = teaser_user_dict["dob"]
    # safe because automatically validated as bool by schema
    s_terms_of_service_accepted = teaser_user_dict["terms_of_service_accepted"]
    # Sanitize the input
    s_username = sanitization_utils.sanitize_str(us_username)
    s_email = sanitization_utils.sanitize_str(us_email)
    s_phone = sanitization_utils.sanitize_str(us_phone)
    s_dob = sanitization_utils.sanitize_str(us_dob)
    # Call the service layer to run business logic --> Returns JSON to return
    return register_user_service(
        s_username=s_username,
        s_email=s_email,
        s_phone=s_phone,
        us_password=us_password,
        s_dob=s_dob,
        s_terms_of_service_accepted=s_terms_of_service_accepted,
    )


urlpatterns = [
    path("admin/", include("admin_honeypot.urls", namespace="admin_honeypot")),
    path("ratio/", admin.site.urls),
    path("api/v1/", api.urls),
]
