---
sidebar_position: 2
sidebar_label: "Cache an API response"
---

# How to cache an API response

Add the `@api_cached` decorator to cache an entire response

```python
@api_cached(
    key="api/v1/your_app/your_endpoint", has_auth=True, uses_controller=False, timeout=60
)
```

### How to cache a database query

**TODO: See https://docs.djangoproject.com/en/4.2/topics/cache/**
