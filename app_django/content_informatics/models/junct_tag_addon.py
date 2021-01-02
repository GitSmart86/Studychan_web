from django.db import models
from ._addon import Addon
from ._informatics_tag import Informatics_Tag


class Junct_InformaticsTag_Addon(models.Model):

    tagged_addon = models.ForeignKey(Addon,
                                     related_name='tagged_addon',
                                     on_delete=models.CASCADE)

    addon_informatics_tag = models.ForeignKey(Informatics_Tag,
                                              related_name='Addon_informatics_tag',
                                              on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tagged_addon', 'addon_informatics_tag')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_addon, self.addon_informatics_tag)
