from ._note import Note
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Sub_Note(models.Model):

    subbingUser_Note = models.ForeignKey(User,
                                         related_name='subbingUser_Note',
                                         on_delete=models.CASCADE)

    subbedNote = models.ForeignKey(Note,
                                   related_name='subbedNote',
                                   on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subbingUser_Note', 'subbedNote')

    def __str__(self):
        return '%s --subbed--> %s' % (self.subbingUser_Note, self.subbedNote)
