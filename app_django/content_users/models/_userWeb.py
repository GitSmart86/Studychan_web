from django.db.models.signals import post_save
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class UserWeb(models.Model):
    user = models.OneToOneField(User,
                                related_name='user_web',
                                on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.user)


# Signal: everytime the sender(User) class is signaled(post_save), run the function(user_did_save)
# the arg instance is the sender class (ie: User), so the newly created UserDjEx.user will be models.OneToOneField() to the instance(User)

def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        UserWeb.objects.get_or_create(user=instance)


post_save.connect(user_did_save, sender=User)
