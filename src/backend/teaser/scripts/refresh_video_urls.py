from core.models.post_models import PostsModel
import requests
from teaser.settings import env


def refresh_video_urls():
    """
    Refresh video urls before changes to update_post_status_service.
    This script was used to fix inconsistencies in the video fallback resolutions used by PostsModel.video_url.
    Deprecated by changes to update_post_status_service.
    """
    invalid_posts = []
    for post in PostsModel.objects.all():
        # Thumbnail is good enough standin
        headers = {"accept": "application/json", "AccessKey": str(env("CDN_API_KEY"))}
        response = requests.get(post.upload_url, headers=headers)
        if response.status_code != 200:
            invalid_posts.append(post)
            continue
        # Set max resolution
        # library_id = str(env("CDN_VIDEO_LIBRARY_ID"))
        pull_zone = str(env("CDN_PULL_ZONE_URL"))
        response_json = response.json()
        # bunny.net mp4 fallback only encodes up to 720p
        max_res_int = max(
            [
                int(res[:-1])
                for res in response.json()["availableResolutions"].split(",")
                if int(res[:-1]) <= 720
            ]
        )
        post.video_url = (
            "https://"
            + pull_zone
            + ".b-cdn.net/"
            + str(post.video_id)
            + "/play_"
            + str(max_res_int)
            + "p.mp4"
        )
        # set video mode to landscape if aspect ratio > 1
        aspect_ratio = response_json["width"] / response_json["height"]
        if aspect_ratio > 1:
            post.video_mode = PostsModel.VideoModes.LANDSCAPE
        post.save()
        print("Updated post", post.video_url)

    for invalid_post in invalid_posts:
        invalid_post.delete()
