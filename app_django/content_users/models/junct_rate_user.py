from django.db import models
from ._userDjEx import UserDjEx
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rate_User(models.Model):

    ratingUser_User = models.ForeignKey(User,
                                        related_name='ratingUser_User',
                                        on_delete=models.CASCADE)

    ratedUser = models.ForeignKey(UserDjEx,
                                  related_name='ratedUser',
                                  on_delete=models.CASCADE)

    posRating = models.BooleanField(default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ratingUser_User', 'ratedUser')

    def __str__(self):
        return '%s rated -> %s' % (self.ratingUser_User, self.ratedUser)
