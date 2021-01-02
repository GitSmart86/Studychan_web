from ._groupdeck import Format
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Sub_Format(models.Model):

    subbingUser_Format = models.ForeignKey(User,
                                           related_name='subbingUser_Format',
                                           on_delete=models.CASCADE)

    subbedFormat = models.ForeignKey(Format,
                                     related_name='subbedFormat',
                                     on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subbingUser_Format', 'subbedFormat')

    def __str__(self):
        return '%s --subbed--> %s' % (self.subbingUser_Format, self.subbedFormat)
