from django.db import models
from ._groupdeck import Groupdeck
from ._phylum_tag import Phylum_Tag


class Junct_PhylumTag_Groupdeck(models.Model):

    tagged_groupdeck = models.ForeignKey(Groupdeck,
                                         related_name='tagged_groupdeck',
                                         on_delete=models.CASCADE)

    groupdeck_phylum_tag = models.ForeignKey(Phylum_Tag,
                                             related_name='groupdeck_phylum_tag',
                                             on_delete=models.CASCADE)

    class Meta:
        unique_together = ('groupdeck_phylum_tag', 'tagged_groupdeck')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_groupdeck, self.groupdeck_phylum_tag)
