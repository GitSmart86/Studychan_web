from ._ccpick import Ccpick
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rate_Ccpick(models.Model):

    ratingUser_Ccpick = models.ForeignKey(User,
                                          related_name='ratingUser_Ccpick',
                                          on_delete=models.CASCADE)

    ratedCcpick = models.ForeignKey(Ccpick,
                                    related_name='ratedCcpick',
                                    on_delete=models.CASCADE)

    posRating = models.BooleanField(default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ratingUser_Ccpick', 'ratedCcpick')

    def __str__(self):
        return '%s rated -> %s' % (self.ratingUser_Ccpick, self.ratedCcpick)
