from ._groupdeck import Groupdeck
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rate_Groupdeck(models.Model):

    ratingUser_Groupdeck = models.ForeignKey(User,
                                             related_name='ratingUser_Groupdeck',
                                             on_delete=models.CASCADE)

    ratedGroupdeck = models.ForeignKey(Groupdeck,
                                       related_name='ratedGroupdeck',
                                       on_delete=models.CASCADE)

    posRating = models.BooleanField(default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ratingUser_Groupdeck', 'ratedGroupdeck')

    def __str__(self):
        return '%s rated -> %s' % (self.ratingUser_Groupdeck, self.ratedGroupdeck)
