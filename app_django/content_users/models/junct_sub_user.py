from django.db import models
from ._userDjEx import UserDjEx
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Sub_User(models.Model):

    subbingUser_User = models.ForeignKey(User,
                                         related_name='subbingUser_User',
                                         on_delete=models.CASCADE)

    subbedUser = models.ForeignKey(UserDjEx,
                                   related_name='subbedUser',
                                   on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subbingUser_User', 'subbedUser')

    def __str__(self):
        return '%s --subbed--> %s' % (self.subbingUser_User, self.subbedUser)
