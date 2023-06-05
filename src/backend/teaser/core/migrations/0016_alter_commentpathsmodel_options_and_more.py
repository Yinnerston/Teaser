# Generated by Django 4.1.6 on 2023-06-05 04:01

import core.utils.config_data
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_remove_bookmarkedpostsmodel_core_bookma_user_id_e46df2_idx_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='commentpathsmodel',
            options={'ordering': ['post_id', 'ancestor']},
        ),
        migrations.AlterModelOptions(
            name='commentsmodel',
            options={'ordering': ['post_id', 'depth', '-created_at']},
        ),
        migrations.RemoveIndex(
            model_name='commentsmodel',
            name='core_commen_user_id_d6258d_idx',
        ),
        migrations.RemoveIndex(
            model_name='sharedpostsmodel',
            name='core_shared_user_id_eef8b4_idx',
        ),
        migrations.RenameField(
            model_name='commentsmodel',
            old_name='likes',
            new_name='n_likes',
        ),
        migrations.AddField(
            model_name='commentpathsmodel',
            name='post_id',
            field=models.ForeignKey(default=core.utils.config_data.get_or_create_sentinel_post_data_id, on_delete=models.SET(core.utils.config_data.get_or_create_sentinel_post_data), to='core.postsmodel'),
        ),
        migrations.AddField(
            model_name='commentsmodel',
            name='depth',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterUniqueTogether(
            name='commentpathsmodel',
            unique_together={('post_id', 'ancestor', 'descendent')},
        ),
        migrations.AddIndex(
            model_name='commentpathsmodel',
            index=models.Index(fields=['post_id', 'ancestor', 'descendent'], name='core_commen_post_id_8e9651_idx'),
        ),
        migrations.AddIndex(
            model_name='commentsmodel',
            index=models.Index(fields=['post_id', 'n_likes'], name='core_commen_post_id_6210ac_idx'),
        ),
        migrations.AddIndex(
            model_name='commentsmodel',
            index=models.Index(fields=['user_id', 'post_id'], name='core_commen_user_id_b68fb5_idx'),
        ),
        migrations.AddIndex(
            model_name='commentsmodel',
            index=models.Index(fields=['post_id', '-created_at'], name='core_commen_post_id_e403f0_idx'),
        ),
        migrations.AddIndex(
            model_name='commentsmodel',
            index=models.Index(fields=['post_id', 'depth'], name='core_commen_post_id_114afa_idx'),
        ),
        migrations.AddIndex(
            model_name='sharedpostsmodel',
            index=models.Index(fields=['user_id', 'post_id'], name='core_shared_user_id_6e1720_idx'),
        ),
        migrations.RemoveField(
            model_name='commentpathsmodel',
            name='depth',
        ),
    ]
