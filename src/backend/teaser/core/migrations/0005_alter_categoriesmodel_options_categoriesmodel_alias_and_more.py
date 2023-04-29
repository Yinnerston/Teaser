# Generated by Django 4.1.6 on 2023-04-29 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_postsmodel_reddit_score'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categoriesmodel',
            options={'ordering': ['alias', 'title']},
        ),
        migrations.AddField(
            model_name='categoriesmodel',
            name='alias',
            field=models.CharField(default='TODO', max_length=50),
            preserve_default=False,
        ),
        migrations.AddIndex(
            model_name='categoriesmodel',
            index=models.Index(fields=['alias'], name='core_catego_alias_173e99_idx'),
        ),
    ]
