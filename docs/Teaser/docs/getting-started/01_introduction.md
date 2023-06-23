---
sidebar_position: 1
sidebar_label: 'Introduction'
---

# Relationships between app functionalities and backend

| Image | Source Code   |
| ---   | ---   |
| ![Main Feed](/docs/img/camerathumb.jpg) | Main feed mainly relates to `src/frontend/teaser/components/templates/TeaserViewList.js`in the frontend and `src/backend/teaser/core/services/post_service.py` in the backend.   |
| ![Video Editor](/docs/img/editthumb.jpg) | The video editing screen can be found at `src/frontend/teaser/screens/upload/UploadEditVideoScreen.js`. Video pre-processing such as concatenation and adding music will be done on the frontend.   |
| ![Uploading Video Screen](/docs/img/uploadpostthumb.jpg) | The screen for submission of a post and tweaking the post parameters can be found at `src/frontend/teaser/screens/upload/UploadPostDetailsScreen.js`. Concatenation of the video and music into one video file is done on submit.   |
| ![Profile Screen](/docs/img/profilethumb.jpg) | Profile screen found at `src/frontend/teaser/screens/profile/ProfileScreen.js`. Backend can be found at `src/backend/teaser/core/services/user_profile_service.py`. Still a work in progress as I need to add Follow functionality, editing your profile details, and navigating to a new feed when you click on a particular post.   |
| ![Song Screen](/docs/img/songthumb.jpg) | Shh don't tell google but I'm planning on hosting `youtube-dl` to dynamically add songs to your teaser video. The static frontend is located at `src/frontend/teaser/screens/upload/UploadSoundScreen.js`. Still a work in progress.   |
| ![Search Screen](/docs/img/searchthumb.jpg) | The searchbar screen can be found at `src/frontend/teaser/screens/search/SearchSuggestionsScreen.js` in the frontend and `src/backend/teaser/core/services/search_service.py` in the backend. Still a work in process as I need to add search suggestions based on fuzzy searches relating to the search term, but I have no users.   |
| ![Search Results Screen](/docs/img/searchresultsthumb.jpg) | The video editing screen can be found at `src/frontend/teaser/screens/search/SearchResultsScreen.js` in the frontend and `src/backend/teaser/core/services/search_service` in the backend. The example shows search results by the query term "Funny". This screen works on categories, description and username. Still a work in progress as I need to add navigating to a new feed when you click on a particular post.    |
| ![Auth Screen](/docs/img/auththumb.jpg) | The Auth screen that link to the login and register forms can be found at `src/frontend/teaser/screens/auth/AuthScreen.js` in the frontend and `src/backend/teaser/core/services/user_auth_services.py` in the backend. Still a work in process as I need to add 2FA.   |
| **TODO**    | More coming soon.    |
