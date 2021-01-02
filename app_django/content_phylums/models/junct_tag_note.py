from django.db import models
from ._note import Note
from ._phylum_tag import Phylum_Tag


class Junct_PhylumTag_Note(models.Model):

    tagged_note = models.ForeignKey(Note,
                                    related_name='tagged_note',
                                    on_delete=models.CASCADE)

    note_phylum_tag = models.ForeignKey(Phylum_Tag,
                                        related_name='note_phylum_tag',
                                        on_delete=models.CASCADE)

    class Meta:
        unique_together = ('note_phylum_tag', 'tagged_note')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_note, self.note_phylum_tag)
