---
sidebar_position: 1
sidebar_label: "Create a URL endpoint"
---

# How to create a new URL HTTP endpoint

See the [tutorial on backend endpoints](../tutorials/01_new_backend_app.md) for a overview of the entire backend.

See `src/backend/teaser/teaser/urls.py` for URL definitions.

### Defining a request and response schema

You can define request schemas in the payload argument.
You can define response schemas in the response parameter in the NinjaExtraAPI `@api` decorator.
 Define schemas in `src/backend/core/schemas/*_schema.py`.



```python
from ninja import Schema, Field
# Schema that you defined in the schema folder
class YourEndpointRequestSchema(Schema):
    request_data: str = Field(example="XYZ")

class YourEndpointResponseSchema(Schema):
    response_data: str = Field(example="XYZ")


@api.get("your_app/your_endpoint", tags=["your_app"], response={200: YourEndpointResponseSchema})
def your_app_your_endpoint(request, payload: YourEndpointRequestSchema)
```


### Attaching Auth

Specify the auth argument in your endpoint defintion.
```python
from core.services.user_auth_services import AuthBearer
@api.get("your_app/your_endpoint", tags=["your_app"], auth=AuthBearer())
```
When a endpoint requires authentication, the HTTP header Authorization parameter must be included with a valid token:
```
Authorization: `Bearer ${authToken}`
```

### Adding pagination

If you want to define an endpoint with pagination, it needs to be defined within an `api_controller`.

```python
@api_controller("/your_app")
class YourAppController:
    @api.get("your_endpoint", tags=["your_app"], auth=AuthBearer())
    @paginate(PageNumberPaginationExtra, page_size=50)
    def your_endpoint(self, request: HttpRequest, response: HttpResponse):
        pass
```

Adding pagination changes the URL parameters. See the django ninja extra docs for examples.

:::danger Offset pagination
Currently using offset-based pagination. Planning on switching to cursor-based pagination in the future.
:::
