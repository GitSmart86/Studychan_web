from ._groupdeck import Groupdeck
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rev_Groupdeck(models.Model):

    reviewingUser_Groupdeck = models.ForeignKey(User,
                                                related_name='reviewingUser_Groupdeck',
                                                on_delete=models.CASCADE)

    reviewedGroupdeck = models.ForeignKey(Groupdeck,
                                          related_name='reviewedGroupdeck',
                                          on_delete=models.CASCADE)

    description = models.TextField(max_length=1000,
                                   blank=True,
                                   null=True)

    stars = models.SmallIntegerField(default=3)

    timestamp_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('reviewingUser_Groupdeck', 'reviewedGroupdeck')

    def __str__(self):
        return '%s rated -> %s' % (self.reviewingUser_Groupdeck, self.reviewedGroupdeck)
