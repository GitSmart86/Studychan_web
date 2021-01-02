from django.db import models
import os
from django.conf import settings


class Theme(models.Model):

    def upload_media(self, instance):
        newFile = 'informatics/icon_theme/{0}.jpg'.format(self.id)
        path = settings.MEDIA_ROOT + "/" + newFile
        if os.path.exists(path):
            os.remove(path)
        return newFile

    timestamp = models.DateTimeField(auto_now_add=True)

    price = models.DecimalField(max_digits=6, decimal_places=3, default=0)

    name = models.CharField(max_length=40)

    description = models.TextField()

    isPublished = models.BooleanField(default=False)

    icon = models.ImageField(
        upload_to=upload_media,
        blank=True,
        null=True)

    def __str__(self):
        return '{0}'.format(self.name)

    def save(self, *args, **kwargs):
        super(Theme, self).save(*args, **kwargs)

        if "None." in self.icon.name:
            savedSelf = Theme.objects.filter(name=self.name).last()
            newName = 'informatics/icon_theme/{0}.jpg'.format(savedSelf.id)
            path = settings.MEDIA_ROOT + '/' + newName
            os.rename(self.icon.path, path)
            self.icon.name = newName

        super(Theme, self).save(*args, **kwargs)
