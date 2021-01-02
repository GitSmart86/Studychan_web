import os
from django.db import models
from ._phylum_tag import Phylum_Tag
from ._format import Format
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Note(models.Model):

    owner = models.ForeignKey(User,
                              related_name='user_note',
                              on_delete=models.CASCADE)

    format_type = models.ForeignKey(Format,
                                    related_name='format_note',
                                    on_delete=models.SET_NULL,
                                    blank=True,
                                    null=True)

    name = models.CharField(max_length=50,
                            blank=True,
                            null=True)

    description = models.TextField(blank=True,
                                   null=True)

    note_contents = models.TextField(blank=True,
                                     null=True)

    timestamp_updated = models.DateTimeField(auto_now=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    isPublished = models.BooleanField(default=False)

    def upload_media(self, instance):
        newFile = 'user/{0}/icon_note/{1}'.format(
            self.owner.id, instance)
        path = settings.MEDIA_ROOT + "/" + newFile
        if os.path.exists(path):
            os.remove(path)
        return newFile

    icon = models.ImageField(
        upload_to=upload_media,
        blank=True,
        null=True)

    ratings = models.ManyToManyField(User,
                                     related_name='note_ratings',
                                     blank=True,
                                     symmetrical=False,
                                     through='Junct_Rate_Note')

    subscribers = models.ManyToManyField(User,
                                         related_name='note_subscriptions',
                                         blank=True,
                                         symmetrical=False,
                                         through='Junct_Sub_Note')

    phylum_tags = models.ManyToManyField(Phylum_Tag,
                                         related_name='notes_phylum_tags',
                                         blank=True,
                                         symmetrical=False,
                                         through='Junct_PhylumTag_Note')

    def __str__(self):
        return '{0}'.format(self.name)

    class Meta(object):
        unique_together = ("owner", "name")

    # def save(self, *args, **kwargs):
    #     super(Note, self).save(*args, **kwargs)

    #     if self.icon is not None:
    #         if "None." in self.icon.name:
    #             savedSelf = Note.objects.filter(name=self.name).last()
    #             newName = '/user/{0}/icon_note/{1}.jpg'.format(
    #                 self.owner.id, savedSelf.id)
    #             path = settings.MEDIA_ROOT + '/' + newName
    #             os.rename(self.icon.path, path)
    #             self.icon.name = newName

    #         super(Note, self).save(*args, **kwargs)
