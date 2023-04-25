from core.utils.post_validator import CATEGORIES_LIST
from core.models.user_profile_models import CategoriesModel

# Create all categories
def create_all_categories():
    for category in CATEGORIES_LIST:
        CategoriesModel.objects.get_or_create(title=category)
    print("Done")

create_all_categories()