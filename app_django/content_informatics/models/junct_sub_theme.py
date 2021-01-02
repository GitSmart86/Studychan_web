from django.db import models
from ._theme import Theme
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Sub_Theme(models.Model):

    subbingUser_Theme = models.ForeignKey(User,
                                          related_name='subbingUser_Theme',
                                          on_delete=models.CASCADE)

    subbedTheme = models.ForeignKey(Theme,
                                    related_name='subbedTheme',
                                    on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subbingUser_Theme', 'subbedTheme')

    def __str__(self):
        return '%s --subbed--> %s' % (self.subbingUser_Theme, self.subbedTheme)
