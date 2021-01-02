from django.db import models
from ._addon import Addon
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Sub_Addon(models.Model):

    subbingUser_Addon = models.ForeignKey(User,
                                          related_name='subbingUser_Addon',
                                          on_delete=models.CASCADE)

    subbedAddon = models.ForeignKey(Addon,
                                    related_name='subbedAddon',
                                    on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subbingUser_Addon', 'subbedAddon')

    def __str__(self):
        return '%s --subbed--> %s' % (self.subbingUser_Addon, self.subbedAddon)
