# Generated by Django 3.0.7 on 2020-07-25 18:30

import content_informatics.models._addon
import content_informatics.models._deed
import content_informatics.models._informatics_tag
import content_informatics.models._theme
import content_informatics.models.junct_img_addon
import content_informatics.models.junct_img_feedback
import content_informatics.models.junct_img_news
import content_informatics.models.junct_img_theme
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('content_informatics', '0002_auto_20200724_2111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addon',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models._addon.Addon.upload_media),
        ),
        migrations.AlterField(
            model_name='deed',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models._deed.Deed.upload_media),
        ),
        migrations.AlterField(
            model_name='informatics_tag',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models._informatics_tag.Informatics_Tag.upload_media),
        ),
        migrations.AlterField(
            model_name='junct_img_addon',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models.junct_img_addon.Junct_Img_Addon.upload_media),
        ),
        migrations.AlterField(
            model_name='junct_img_feedback',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models.junct_img_feedback.Junct_Img_Feedback.upload_media),
        ),
        migrations.AlterField(
            model_name='junct_img_news',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models.junct_img_news.Junct_Img_News.upload_media),
        ),
        migrations.AlterField(
            model_name='junct_img_news',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='news_img', to='content_informatics.News'),
        ),
        migrations.AlterField(
            model_name='junct_img_theme',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models.junct_img_theme.Junct_Img_Theme.upload_media),
        ),
        migrations.AlterField(
            model_name='theme',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to=content_informatics.models._theme.Theme.upload_media),
        ),
    ]
