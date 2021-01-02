from django.db import models
from ._feedback import Feedback
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Feedback_Response(models.Model):

    feedback_response_owner = models.ForeignKey(User,
                                                related_name='feedback_response_owner',
                                                on_delete=models.CASCADE)

    ori_feedback = models.ForeignKey(Feedback,
                                     related_name='feedback_response',
                                     on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    isPublished = models.BooleanField(default=False)

    description = models.TextField(blank=True,
                                   null=True)

    def __str__(self):
        return '{0}'.format(self.ori_feedback)

    # def user_directory_path(instance, filename):
    #     # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    #     return 'user_{0}/{1}'.format(instance.user.id, filename)
