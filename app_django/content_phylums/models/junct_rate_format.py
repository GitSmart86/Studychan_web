from ._format import Format
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rate_Format(models.Model):

    ratingUser_Format = models.ForeignKey(User,
                                          related_name='ratingUser_Format',
                                          on_delete=models.CASCADE)

    ratedFormat = models.ForeignKey(Format,
                                    related_name='ratedFormat',
                                    on_delete=models.CASCADE)

    posRating = models.BooleanField(default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ratingUser_Format', 'ratedFormat')

    def __str__(self):
        return '%s rated -> %s' % (self.ratingUser_Format, self.ratedFormat)
