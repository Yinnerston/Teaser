from core.models.post_models import PostsModel
import requests


def prune_posts():
    """
    Iterate through all the posts and delete the posts with invalid video_url(s)
    """
    invalid_posts = []
    for post in PostsModel.objects.all():
        # Thumbnail is good enough standin
        if requests.get(post.thumbnail_url).status_code != 200:
            invalid_posts.append(post)

    for invalid_post in invalid_posts:
        invalid_post.delete()
