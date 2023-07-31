# Generated by Django 4.1.6 on 2023-06-09 05:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0021_alter_teaserusermodel_profile_photo_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostReportsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('post_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.commentsmodel')),
            ],
        ),
        migrations.CreateModel(
            name='CommentReportsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('comment_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.commentsmodel')),
            ],
        ),
    ]