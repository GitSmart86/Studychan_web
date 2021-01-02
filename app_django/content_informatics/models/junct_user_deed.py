from ._deed import Deed
from django.conf import settings
from django.db import models
User = settings.AUTH_USER_MODEL


class Junct_User_Deed(models.Model):

    deed = models.ForeignKey(Deed,
                             related_name='deed_holder',
                             on_delete=models.CASCADE)

    owner = models.ForeignKey(User,
                              related_name='user_deed',
                              on_delete=models.CASCADE)

    dt_start = models.DateTimeField(auto_now_add=True)

    dt_end = models.DateTimeField(blank=True,
                                  null=True)

    def __str__(self):
        return '{}'.format(self.owner)
