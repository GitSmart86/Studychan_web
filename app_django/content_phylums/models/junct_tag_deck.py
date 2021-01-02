from django.db import models
from ._deck import Deck
from ._phylum_tag import Phylum_Tag


class Junct_PhylumTag_Deck(models.Model):

    tagged_deck = models.ForeignKey(Deck,
                                    related_name='tagged_deck',
                                    on_delete=models.CASCADE)

    deck_phylum_tag = models.ForeignKey(Phylum_Tag,
                                        related_name='deck_phylum_tag',
                                        on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tagged_deck', 'deck_phylum_tag')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_deck, self.deck_phylum_tag)
