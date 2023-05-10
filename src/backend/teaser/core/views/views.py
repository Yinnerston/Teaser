from django.shortcuts import render, get_list_or_404
from core.models.openai_models import OpenaiGeneratedImagesModel


def IndexView(request):
    return render(
        request,
        "core/index.html",
    )


def OpenAIGeneratedImageView(request, request_id):
    generated_images = get_list_or_404(
        OpenaiGeneratedImagesModel, request_id=request_id
    )
    return render(
        request,
        "core/openai/generated_image.html",
        {"generated_images": generated_images},
    )
