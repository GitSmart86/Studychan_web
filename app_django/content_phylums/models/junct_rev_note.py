from ._note import Note
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rev_Note(models.Model):

    reviewingUser_Note = models.ForeignKey(User,
                                           related_name='reviewingUser_Note',
                                           on_delete=models.CASCADE)

    reviewedNote = models.ForeignKey(Note,
                                     related_name='reviewedNote',
                                     on_delete=models.CASCADE)

    description = models.TextField(max_length=1000,
                                   blank=True,
                                   null=True)

    stars = models.SmallIntegerField(default=3)

    timestamp_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('reviewingUser_Note', 'reviewedNote')

    def __str__(self):
        return '%s rated -> %s' % (self.reviewingUser_Note, self.reviewedNote)
