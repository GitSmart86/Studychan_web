import os
from django.db import models
from ._phylum_tag import Phylum_Tag
from ._format import Format
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Ccpick(models.Model):

    owner = models.ForeignKey(User,
                              related_name='user_ccpick',
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
        newFile = 'user/{0}/icon_ccpick/{1}'.format(
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
                                     related_name='ccpick_ratings',
                                     blank=True,
                                     symmetrical=False,
                                     through='Junct_Rate_CcPick')

    phylum_tags = models.ManyToManyField(Phylum_Tag,
                                         related_name='ccpicks_phylum_tags',
                                         blank=True,
                                         symmetrical=False,
                                         through='Junct_PhylumTag_Ccpick')

    def __str__(self):
        return '{0}'.format(self.name)

    class Meta(object):
        unique_together = ("owner", "name")

    # def save(self):
    #     super(Ccpick, self).save()

    #     if self.icon is not None:
    #         if "None." in self.icon.name:
    #             savedSelf = Ccpick.objects.filter(name=self.name).last()
    #             newName = '/user/{0}/icon_ccpick/{1}.jpg'.format(
    #                 self.owner.id, savedSelf.id)
    #             path = settings.MEDIA_ROOT + '/' + newName
    #             os.rename(self.icon.path, path)
    #             self.icon.name = newName

    #         super(Ccpick, self).save()
