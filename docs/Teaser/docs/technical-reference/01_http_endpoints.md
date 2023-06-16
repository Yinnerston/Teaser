---
sidebar_position: 1
sidebar_label: "HTTP Endpoints"
---

# HTTP endpoints

https://wocchit.com/api/v1/docs

**TODO: Link to backend code**

### Users
`POST /api/v1/register`
Register User Endpoint

`POST /api/v1/login`
Login User Endpoint

`POST /api/v1/logout`
Logout User Endpoint

`POST /api/v1/users/categories`
Add User Category Endpoint

`GET /api/v1/users/profile`
Get Authenticated User Profile Endpoint

`GET /api/v1/users/{username}/profile`
Get User Profile From Username Endpoint

### Token

`POST /api/v1/token/invalidate`
Invalidate Token Endpoint

`POST /api/v1/token/create`
Create Token Endpoint

`GET /api/v1/token/refresh`
Refresh Token Endpoint

### Posts

`POST /api/v1/posts/create`
Create Post Endpoint

`POST /api/v1/posts/update_status`
Update Posts Status Endpoint

`POST /api/v1/posts/like`
Like Post Endpoint

`POST /api/v1/posts/bookmark`
Bookmark Post Endpoint

`POST /api/v1/posts/comment`
Comment On Post Endpoint

`POST /api/v1/posts/comment/like`
Like Post Comment Endpoint

`POST /api/v1/posts/comment/report`
Report Post Comment Endpoint

`GET /api/v1/posts/feed`
Get Posts General Feed Endpoint

`GET /api/v1/posts/forYou`
Get Posts For You Feed Endpoint

`GET /api/v1/posts/users/{username}`
Get Profile Posts

`GET /api/v1/posts/self`
Get Own Profile Posts

`GET /api/v1/posts/comments/top_level/{post_id}`
Get Top Level Post Comments Endpoint

`GET /api/v1/posts/comments/replies/{post_id}/{comment_id}`
Get Post Comment Replies Endpoint

# Songs

`POST /api/v1/songs/create`
Create Song Endpoint

### Search

`GET /api/v1/search/suggestions/{query_str}`
Get Search Suggestions Endpoint

`GET /api/v1/search/query/{query_str}`
Get Search Results Endpoint
