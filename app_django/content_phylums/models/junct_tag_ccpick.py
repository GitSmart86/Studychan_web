from django.db import models
from ._ccpick import Ccpick
from ._phylum_tag import Phylum_Tag


class Junct_PhylumTag_Ccpick(models.Model):

    tagged_ccpick = models.ForeignKey(Ccpick,
                                      related_name='tagged_ccpick',
                                      on_delete=models.CASCADE)

    ccpick_phylum_tag = models.ForeignKey(Phylum_Tag,
                                          related_name='ccpick_phylum_tag',
                                          on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tagged_ccpick', 'ccpick_phylum_tag')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_ccpick, self.ccpick_phylum_tag)
