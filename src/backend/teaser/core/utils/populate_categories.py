from core.utils.user_profile_validator import CATEGORIES_ALIASES
from core.models.user_profile_models import CategoriesModel


# Create all categories
def create_all_categories():
    for alias, categories in CATEGORIES_ALIASES.items():
        for category in categories:
            CategoriesModel.objects.get_or_create(title=category, alias=alias)
    print("Done")


create_all_categories()
