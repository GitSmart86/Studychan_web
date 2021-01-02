from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class UserApk(models.Model):
    user = models.OneToOneField(User,
                                related_name='user_apk',
                                on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.user)


def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        UserApk.objects.get_or_create(user=instance)


post_save.connect(user_did_save, sender=User)
