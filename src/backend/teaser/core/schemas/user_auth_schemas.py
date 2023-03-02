from ninja import Schema


class TeaserUserSchema(Schema):
    username: str
    email: str
    phone: str
    password: str
    dob: str
    terms_of_service_accepted: bool
