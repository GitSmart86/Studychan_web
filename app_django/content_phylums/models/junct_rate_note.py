from ._note import Note
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_Rate_Note(models.Model):

    ratingUser_Note = models.ForeignKey(User,
                                        related_name='ratingUser_Note',
                                        on_delete=models.CASCADE)

    ratedNote = models.ForeignKey(Note,
                                  related_name='ratedNote',
                                  on_delete=models.CASCADE)

    posRating = models.BooleanField(default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ratingUser_Note', 'ratedNote')

    def __str__(self):
        return '%s rated -> %s' % (self.ratingUser_Note, self.ratedNote)
