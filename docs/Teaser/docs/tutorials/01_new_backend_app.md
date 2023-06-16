---
sidebar_position: 1
sidebar_label: 'Adding a django app to Teaser'
---

# Adding a new django application

**TODO: Work in progress**

### Prerequisites

Follow the django docs on creating a new app.

### URL Endpoint, Service Layer and, Data Model pattern

Separate the Data Model from the business logic in your application.

### Defining the view / URL endpoint

Define in `src/backend/teaser/teaser/urls.py`.
- Controller for pagination, request / response schema, HTTP status codes
  - Django Ninja Extra Controller Routes: https://eadwincode.github.io/django-ninja-extra/api_controller/api_controller_route/
  - Django Ninja Schemas: https://django-ninja.rest-framework.com/guides/response/
  - Status Codes: **TODO** Add to #technical-reference
- Validation of payload, sanitization utils defined in `src/backend/teaser/core/utils/sanitization_utils.py`.
- Caching: Use the `api_cached` decorator to cache HTTP responses.

:::tip HTTP Status Codes
Use standardised HTTP status codes in your response.
:::


### Defining the Data Model

Define in `src/backend/teaser/core/models/*_models.py`.
- See
- Guidelines on avoiding FAT models -->

:::tip Variable naming
Each variable's type or kind should be obvious from its name. I use a form of hungarian notation to denote data types.
:::

### Defining the Service Layer

Define in `src/backend/teaser/core/services/*_service.py`.
- Validate inputs against business logic
- Perform database operations
- Catch database errors and return HTTP status codes / custom errors
- Relate to output schema

:::tip Separating Business Logic from the Data Model
Services generally correspond tightly to views. FAT Models break encapsulation of business logic in the service layer.

https://news.ycombinator.com/item?id=23325113

https://news.ycombinator.com/item?id=23322880
:::


### Defining admin

See how to setup the Django Admin

### Writing tests

Define in `src/backend/teaser/{MODULE_NAME}/tests/*_test.py`.
