FROM python:3.10.9-slim

# set work directory
WORKDIR /app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .
RUN python -m pip install -r requirements.txt --no-cache-dir
