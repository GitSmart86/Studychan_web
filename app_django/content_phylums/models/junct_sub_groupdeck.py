from ._groupdeck import Groupdeck
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Sub_Groupdeck(models.Model):

    subbingUser_Groupdeck = models.ForeignKey(User,
                                              related_name='subbingUser_Groupdeck',
                                              on_delete=models.CASCADE)

    subbedGroupdeck = models.ForeignKey(Groupdeck,
                                        related_name='subbedGroupdeck',
                                        on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subbingUser_Groupdeck', 'subbedGroupdeck')

    def __str__(self):
        return '%s --subbed--> %s' % (self.subbingUser_Groupdeck, self.subbedGroupdeck)
