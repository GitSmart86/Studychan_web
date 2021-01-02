from django.db import models
import os
from django.conf import settings


class Informatics_Tag(models.Model):

    def upload_media(self, instance):
        newFile = 'informatics/icon_tag/{0}.jpg'.format(self.id)
        path = settings.MEDIA_ROOT + "/" + newFile
        if os.path.exists(path):
            os.remove(path)
        return newFile

    name = models.CharField(max_length=50,
                            blank=True,
                            null=True)

    icon = models.ImageField(
        upload_to=upload_media,
        blank=True,
        null=True)

    isPublished = models.BooleanField(default=True)

    def __str__(self):
        return '{0}'.format(self.name)

    def save(self, *args, **kwargs):
        super(Informatics_Tag, self).save(*args, **kwargs)

        if "None." in self.icon.name:
            savedSelf = Informatics_Tag.objects.filter(name=self.name).last()
            newName = 'informatics/icon_tag/{0}.jpg'.format(savedSelf.id)
            path = settings.MEDIA_ROOT + '/' + newName
            os.rename(self.icon.path, path)
            self.icon.name = newName

        super(Informatics_Tag, self).save(*args, **kwargs)
