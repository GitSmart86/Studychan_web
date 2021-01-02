from django.db import models
from ._note import Note
import os
from django.conf import settings


class Junct_Img_Note(models.Model):

    owner = models.ForeignKey(Note,
                              related_name='note_img',
                              on_delete=models.CASCADE)

    name = models.CharField(max_length=50,
                            default="No_Name")

    def upload_media(self, instance):
        newFile = 'user/{0}/img_note/{1}'.format(
            self.owner.id, instance)
        path = settings.MEDIA_ROOT + "/" + newFile
        if os.path.exists(path):
            os.remove(path)
        return newFile

    img = models.ImageField(
        upload_to=upload_media,
        blank=True,
        null=True)

    def __str__(self):
        return '%s _:_ %s' % (self.owner, self.img)

    def save(self, *args, **kwargs):
        fileName = self.img.name.rsplit('.', 1)[0]
        self.name = fileName
        super(Junct_Img_Note, self).save(*args, **kwargs)
