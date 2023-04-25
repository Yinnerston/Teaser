from core.models.post_models import PostsModel, SongsModel
from django.db import models

NO_SONG_CHOSEN_FOREIGN_KEY = -1
SONGS_MODEL = 1
# POST TYPES ENUM
TEASER_POST_TYPE = 0
QUESTION_POST_TYPE = 1
POST_TYPES = [TEASER_POST_TYPE, QUESTION_POST_TYPE]
CATEGORIES_LIST = [
    "Homemade",
    "Camming",
    "First Person",
    "Asian",
    "Brazilian",
    "Chinese",
    "Ebony",
    "European",
    "Interracial",
    "Indian",
    "Interracial",
    "Japanese",
    "Latino",
    "Russian",
    "Anime",
    "Western Cartoon",
    "VTuber",
    "Stepmom",
    "Mature",
    "Housewife",
    "Daddy",
    "Twink",
    "Strapon",
    "Fingering",
    "Futanari",
    "Shemale",
    "Comedy",
    "Memes",
    "Shitposting",
    "Dating",
    "Dinner",
    "No Sex",
    "Threesome",
    "Gangbang",
    "Crossdressing",
    "Sissy",
    "Pegging",
    "Blowjob",
    "Cunnilingus",
    "Tutorials",
    "Tiktok",
    "Snapchat",
    "Instagram",
    "Cosplay",
    "Teacher",
    "College",
    "Maid",
    "Workout",
    "Sports",
    "Wrestling",
    "Tiktok",
    "Ballroom",
    "Petite",
    "Curvy",
    "Johnny Sins",
    "Riley Reid",
    "Try Not To Cum Challenge",
    "NNN",
    "Overwatch",
    "Fortnite",
    "League of Legends",
    "Mobile VR",
    "Will Smith Slap",
    "Foot Fetish",
    "Boots",
    "Blindfold",
    "Handcuffs",
    "Rope Bondage",
    "BDSM",
    "Furry",
    "Masturbation",
    "Fashion",
    "Public",
    "Parody",
    "Amateur",
    "Ethnicity",
    "Hentai",
    "MILF",
    "Gay",
    "Lesbian",
    "Transgender",
    "Funny",
    "Romantic",
    "Group",
    "Femboy",
    "Femdom",
    "Oral",
    "Anal",
    "How To / Educational",
    "Social Media",
    "Roleplay",
    "Fitness",
    "Dance",
    "Body Type",
    "Pornstars",
    "Challenges",
    "Video Games",
    "VR / AR",
    "Pop Culture",
    "Feet",
    "Bondage",
    "Other",
]
ALL_CATEGORIES_TEMP = {
    "Homemade": True,
    "Camming": True,
    "First Person": True,
    "Asian": True,
    "Brazilian": True,
    "Chinese": True,
    "Ebony": True,
    "European": True,
    "Interracial": True,
    "Indian": True,
    "Japanese": True,
    "Latino": True,
    "Russian": True,
    "Anime": True,
    "Western Cartoon": True,
    "VTuber": True,
    "Stepmom": True,
    "Mature": True,
    "Housewife": True,
    "Daddy": True,
    "Twink": True,
    "Strapon": True,
    "Fingering": True,
    "Futanari": True,
    "Shemale": True,
    "Comedy": True,
    "Memes": True,
    "Shitposting": True,
    "Dating": True,
    "Dinner": True,
    "No Sex": True,
    "Threesome": True,
    "Gangbang": True,
    "Crossdressing": True,
    "Sissy": True,
    "Pegging": True,
    "Blowjob": True,
    "Cunnilingus": True,
    "Tutorials": True,
    "Tiktok": True,
    "Snapchat": True,
    "Instagram": True,
    "Cosplay": True,
    "Teacher": True,
    "College": True,
    "Maid": True,
    "Workout": True,
    "Sports": True,
    "Wrestling": True,
    "Ballroom": True,
    "Petite": True,
    "Curvy": True,
    "Johnny Sins": True,
    "Riley Reid": True,
    "Try Not To Cum Challenge": True,
    "NNN": True,
    "Overwatch": True,
    "Fortnite": True,
    "League of Legends": True,
    "Mobile VR": True,
    "Will Smith Slap": True,
    "Foot Fetish": True,
    "Boots": True,
    "Blindfold": True,
    "Handcuffs": True,
    "Rope Bondage": True,
    "BDSM": True,
    "Furry": True,
    "Masturbation": True,
    "Fashion": True,
    "Public": True,
    "Parody": True,
    "Amateur": True,
    "Ethnicity": True,
    "Hentai": True,
    "MILF": True,
    "Gay": True,
    "Lesbian": True,
    "Transgender": True,
    "Funny": True,
    "Romantic": True,
    "Group": True,
    "Femboy": True,
    "Femdom": True,
    "Oral": True,
    "Anal": True,
    "How To / Educational": True,
    "Social Media": True,
    "Roleplay": True,
    "Fitness": True,
    "Dance": True,
    "Body Type": True,
    "Pornstars": True,
    "Challenges": True,
    "Video Games": True,
    "VR / AR": True,
    "Pop Culture": True,
    "Feet": True,
    "Bondage": True,
    "Other": True,
}


def validate_foreign_key(model_type: int, foreign_key: int):
    if model_type == SONGS_MODEL:
        try:
            if foreign_key != NO_SONG_CHOSEN_FOREIGN_KEY:
                SongsModel.objects.get(id=foreign_key)
        except SongsModel.DoesNotExist:
            raise ValueError  # TODO: Should this be a


def validate_description(description):
    if len(description) > 200:
        raise ValueError  # TODO:
    return description


def validate_post_type(post_type):
    if not post_type in POST_TYPES:
        raise ValueError  # TODO:
    return post_type


def validate_post_data(post_data):
    # TODO: Urls, Thumbnails
    # TODO: Validate categories are valid in db
    for category in post_data["data"]["categories"]:
        if not ALL_CATEGORIES_TEMP[category]:
            raise ValueError  # TODO:
    return post_data


def validate_create_post_service(
    s_description: str,
    s_user_id: int,
    s_song_id: int,
    s_post_type: int,
    s_post_data: dict,
    s_is_private: bool,
):
    validate_description(s_description)
    validate_foreign_key(s_song_id, SONGS_MODEL)
    validate_post_type(s_post_type)
    validate_post_data(s_post_data)


def validate_create_song_service(s_title: str, s_author: str, s_song_url: str):
    # TODO: Raise validation errors.
    pass
