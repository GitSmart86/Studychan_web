import os
from django.db import models
from ._phylum_tag import Phylum_Tag
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Format(models.Model):

    owner = models.ForeignKey(User,
                              related_name='user_format',
                              on_delete=models.CASCADE)

    name = models.CharField(max_length=50,
                            blank=True,
                            null=True)

    description = models.TextField(blank=True,
                                   null=True)

    timestamp_updated = models.DateTimeField(auto_now=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    isPublished = models.BooleanField(default=False)

    def upload_media(self, instance):
        newFile = 'user/{0}/icon_format/{1}'.format(
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
                                     related_name='format_ratings',
                                     blank=True,
                                     symmetrical=False,
                                     through='Junct_Rate_Format')

    subscribers = models.ManyToManyField(User,
                                         related_name='format_subscriptions',
                                         blank=True,
                                         symmetrical=False,
                                         through='Junct_Sub_Format')

    phylum_tags = models.ManyToManyField(Phylum_Tag,
                                         related_name='formats_phylum_tags',
                                         blank=True,
                                         symmetrical=False,
                                         through='Junct_PhylumTag_Format')

    DECK = "DECK"
    GROUPDECK = "GROUPDECK"
    LESSON = "LESSON"

    CONTENT_TYPES = (
        (DECK, "Deck"),
        (GROUPDECK, "Groupdeck"),
        (LESSON, "Lesson"),
    )

    content_type = models.CharField(max_length=10,
                                    choices=CONTENT_TYPES,
                                    default=DECK)

    def __str__(self):
        return '{0}'.format(self.name)

    class Meta(object):
        unique_together = ("owner", "name")

    # def save(self, *args, **kwargs):
    #     super(Format, self).save(*args, **kwargs)

    #     if self.icon is not None:
    #         if "None." in self.icon.name:
    #             savedSelf = Format.objects.filter(name=self.name).last()
    #             newName = '/user/{0}/icon_format/{1}.jpg'.format(
    #                 self.owner.id, savedSelf.id)
    #             path = settings.MEDIA_ROOT + '/' + newName
    #             os.rename(self.icon.path, path)
    #             self.icon.name = newName

    #         super(Format, self).save(*args, **kwargs)
