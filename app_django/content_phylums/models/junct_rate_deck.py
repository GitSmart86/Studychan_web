from django.db import models
from ._deck import Deck
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rate_Deck(models.Model):

    ratingUser_Deck = models.ForeignKey(User,
                                        related_name='ratingUser_Deck',
                                        on_delete=models.CASCADE)

    ratedDeck = models.ForeignKey(Deck,
                                  related_name='ratedDeck',
                                  on_delete=models.CASCADE)

    posRating = models.BooleanField(default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ratingUser_Deck', 'ratedDeck')

    def __str__(self):
        return '%s rated -> %s' % (self.ratingUser_Deck, self.ratedDeck)
