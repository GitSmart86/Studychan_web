from django.db.models.signals import post_save
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class UserStat(models.Model):
    user = models.OneToOneField(User,
                                related_name='user_stat',
                                on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{0}'.format(self.user)
