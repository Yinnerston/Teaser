import os

import openai
from django.db import transaction
from core.models.openai_models import OpenaiGeneratedImagesModel
import uuid

openai.api_key = os.getenv("OPENAI_API_KEY")


def text_completion_service(s_prompt: str, s_temperature: float):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=s_prompt,
        temperature=s_temperature,
        n=3,
    )
    return response.choices


def image_generation_service(s_prompt: str):
    response = openai.Image.create(
        prompt=s_prompt, n=3, size="1024x1024", response_format="url"
    )
    request_id = uuid.uuid4()
    for url_dict in response["data"]:
        OpenaiGeneratedImagesModel.objects.create(
            request_id=request_id,
            prompt=s_prompt,
            url=url_dict["url"],
            file_path=url_dict["url"],  # TODO:
        )
    return f"https://wocchit.com/openai/image/{request_id}"
