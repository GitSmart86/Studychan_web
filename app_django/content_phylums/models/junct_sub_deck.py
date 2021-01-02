from ._deck import Deck
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Sub_Deck(models.Model):

    subbingUser_Deck = models.ForeignKey(User,
                                         related_name='subbingUser_Deck',
                                         on_delete=models.CASCADE)

    subbedDeck = models.ForeignKey(Deck,
                                   related_name='subbedDeck',
                                   on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subbingUser_Deck', 'subbedDeck')

    def __str__(self):
        return '%s --subbed--> %s' % (self.subbingUser_Deck, self.subbedDeck)
