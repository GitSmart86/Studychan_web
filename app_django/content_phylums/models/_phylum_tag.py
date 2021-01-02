from django.db import models
import os
from django.conf import settings


class Phylum_Tag(models.Model):

    name = models.CharField(max_length=50,
                            blank=True,
                            null=True)

    def upload_media(self, instance):
        newFile = 'phylum/icon_tag/{0}.jpg'.format(self.id)
        path = settings.MEDIA_ROOT + "/" + newFile
        if os.path.exists(path):
            os.remove(path)
        return newFile

    icon = models.ImageField(
        upload_to=upload_media,
        blank=True,
        null=True)

    isPublished = models.BooleanField(default=True)

    def __str__(self):
        return '{0}'.format(self.name)

    def save(self, *args, **kwargs):
        # print('___ PATH: ', self.icon.path)
        # print('___ NAME: ', self.icon.name)
        super(Phylum_Tag, self).save(*args, **kwargs)

        if self.icon is not None:
            if "None." in self.icon.name:
                savedSelf = Phylum_Tag.objects.filter(name=self.name).last()
                newName = '/phylum/icon_tag/{0}.jpg'.format(savedSelf.id)
                path = settings.MEDIA_ROOT + '/' + newName
                os.rename(self.icon.path, path)
                self.icon.name = newName

            super(Phylum_Tag, self).save(*args, **kwargs)
