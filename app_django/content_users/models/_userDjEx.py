from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from content_phylums.models._phylum_tag import Phylum_Tag
from django.conf import settings
import os


class UserDjEx(AbstractUser):

    objects = UserManager()

    description = models.TextField(max_length=500,
                                   blank=True,
                                   null=True)

    def upload_media(self, instance):
        newFile = 'user/{0}/icon_user.jpg'.format(self.id)
        path = settings.MEDIA_ROOT + "/" + newFile
        if os.path.exists(path):
            os.remove(path)
        return newFile

    icon = models.ImageField(
        upload_to=upload_media,
        blank=True,
        null=True)

    subscribers = models.ManyToManyField('self',
                                         related_name='your_subscriptions',
                                         blank=True,
                                         symmetrical=False,
                                         through='Junct_Sub_User')

    posRatings = models.ManyToManyField('self',
                                        related_name='your_posRatings',
                                        blank=True,
                                        symmetrical=False,
                                        through='Junct_Rate_User')

    phylum_tags = models.ManyToManyField(Phylum_Tag,
                                         related_name='your_phylum_tags',
                                         blank=True,
                                         symmetrical=False,
                                         through='Junct_PhylumTag_User')

    def __str__(self):
        return '%s' % (self.username)
