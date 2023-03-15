import os

import openai

openai.api_key = os.getenv("OPENAI_API_KEY")


def text_completion_service(s_prompt: str, s_temperature: float):
    response = openai.Completion.create(
        model="text-davinci-003", prompt=s_prompt, temperature=s_temperature, n=3
    )
    return response.choices
