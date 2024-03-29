# Generated by Django 4.1.6 on 2023-05-29 04:42

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_alter_eventmetricsmodel_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SharedPostsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('n_shares', models.PositiveIntegerField(default=0)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RenameField(
            model_name='bookmarkedpostsmodel',
            old_name='created_at',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='likedpostsmodel',
            old_name='created_at',
            new_name='updated_at',
        ),
        migrations.RemoveField(
            model_name='postsmodel',
            name='reddit_score',
        ),
        migrations.AddField(
            model_name='commentsmodel',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='commentsmodel',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='likedpostsmodel',
            name='is_liked',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='postsmodel',
            name='n_bookmarks',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='postsmodel',
            name='n_comments',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='postsmodel',
            name='n_likes',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='postsmodel',
            name='n_shares',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='eventmetricsmodel',
            name='event_type',
            field=models.IntegerField(choices=[(0, 'Undefined'), (1, 'Login'), (2, 'Register'), (3, 'Search'), (4, 'Like'), (5, 'Bookmark'), (6, 'Share'), (7, 'Comment')], default=0),
        ),
        migrations.CreateModel(
            name='UserPostActivitiesModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bookmarked_post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.bookmarkedpostsmodel')),
                ('liked_post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.likedpostsmodel')),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.postsmodel')),
                ('shared_post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.sharedpostsmodel')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.teaserusermodel')),
            ],
        ),
        migrations.AddField(
            model_name='sharedpostsmodel',
            name='post_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.postsmodel'),
        ),
        migrations.AddField(
            model_name='sharedpostsmodel',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.teaserusermodel'),
        ),
    ]
