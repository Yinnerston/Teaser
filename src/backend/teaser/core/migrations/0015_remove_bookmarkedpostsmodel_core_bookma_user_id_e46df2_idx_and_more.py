# Generated by Django 4.1.6 on 2023-05-29 08:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_alter_bookmarkedpostsmodel_unique_together_and_more'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='bookmarkedpostsmodel',
            name='core_bookma_user_id_e46df2_idx',
        ),
        migrations.RemoveIndex(
            model_name='likedpostsmodel',
            name='core_likedp_user_id_f027c3_idx',
        ),
        migrations.RemoveIndex(
            model_name='sharedpostsmodel',
            name='core_shared_user_id_6e1720_idx',
        ),
        migrations.AddField(
            model_name='bookmarkedpostsmodel',
            name='is_bookmarked',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='userpostactivitiesmodel',
            name='bookmarked_post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.bookmarkedpostsmodel'),
        ),
        migrations.AlterField(
            model_name='userpostactivitiesmodel',
            name='liked_post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.likedpostsmodel'),
        ),
        migrations.AlterField(
            model_name='userpostactivitiesmodel',
            name='shared_post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.sharedpostsmodel'),
        ),
        migrations.AddIndex(
            model_name='bookmarkedpostsmodel',
            index=models.Index(fields=['user_id', 'post_id', 'is_bookmarked'], name='core_bookma_user_id_8f79fa_idx'),
        ),
        migrations.AddIndex(
            model_name='likedpostsmodel',
            index=models.Index(fields=['user_id', 'post_id', 'is_liked'], name='core_likedp_user_id_1d6426_idx'),
        ),
        migrations.AddIndex(
            model_name='sharedpostsmodel',
            index=models.Index(fields=['user_id', 'post_id', 'n_shares'], name='core_shared_user_id_eef8b4_idx'),
        ),
    ]
