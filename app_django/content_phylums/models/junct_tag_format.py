from django.db import models
from ._format import Format
from ._phylum_tag import Phylum_Tag


class Junct_PhylumTag_Format(models.Model):

    tagged_format = models.ForeignKey(Format,
                                      related_name='tagged_format',
                                      on_delete=models.CASCADE)

    format_phylum_tag = models.ForeignKey(Phylum_Tag,
                                          related_name='format_phylum_tag',
                                          on_delete=models.CASCADE)

    class Meta:
        unique_together = ('format_phylum_tag', 'tagged_format')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_format, self.format_phylum_tag)
