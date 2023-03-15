from ninja import Schema, Field


class OpenaiTextCompletionSchema(Schema):
    prompt: str = Field(
        example="Write a tagline for a TikTok-like social media app based in Sydney."
    )
    temperature: float = Field(example=0.6)


class OpenaiImageGenerationSchema(Schema):
    prompt: str = Field(example="An anime cat holding up a sign saying 'Teaser!'.")
