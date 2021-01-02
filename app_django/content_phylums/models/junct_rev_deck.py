from ._deck import Deck
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rev_Deck(models.Model):

    reviewingUser_Deck = models.ForeignKey(User,
                                           related_name='reviewingUser_Deck',
                                           on_delete=models.CASCADE)

    reviewedDeck = models.ForeignKey(Deck,
                                     related_name='reviewedDeck',
                                     on_delete=models.CASCADE)

    description = models.TextField(max_length=1000,
                                   blank=True,
                                   null=True)

    stars = models.SmallIntegerField(default=3)

    timestamp_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('reviewingUser_Deck', 'reviewedDeck')

    def __str__(self):
        return '%s rated -> %s' % (self.reviewingUser_Deck, self.reviewedDeck)
