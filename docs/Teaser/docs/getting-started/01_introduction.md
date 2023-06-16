---
sidebar_position: 1
sidebar_label: 'Introduction'
---

# Relationships between app functionalities and backend

| Image | Source Code   |
| ---   | ---   |
| ![Main Feed](./images/camerathumb.jpg) | Main feed mainly relates to `src/frontend/teaser/components/templates/TeaserViewList.js`in the frontend and `src/backend/teaser/core/services/post_service.py` in the backend.   |
| ![Video Editor](./images/editthumb.jpg) | The video editing screen can be found at `src/frontend/teaser/screens/upload/UploadEditVideoScreen.js`. Video pre-processing such as concatenation and adding music will be done on the frontend.   |
