from django.db import models
from ._news import News
import os
from django.conf import settings


class Junct_Img_News(models.Model):

    owner = models.ForeignKey(News,
                              related_name='news_img',
                              on_delete=models.CASCADE)

    name = models.CharField(max_length=50,
                            default="No_Name")

    def upload_media(self, instance):
        newFile = 'informatics/img_news/{0}'.format(instance)
        path = settings.MEDIA_ROOT + "/" + newFile
        if os.path.exists(path):
            os.remove(path)
        return newFile

    img = models.ImageField(
        upload_to=upload_media,
        max_length=100,
        blank=True,
        null=True)

    def __str__(self):
        return '%s _:_ %s' % (self.owner, self.img)

    def save(self, *args, **kwargs):
        fileName = self.img.name.rsplit('.', 1)[0]
        self.name = fileName
        super(Junct_Img_News, self).save(*args, **kwargs)
