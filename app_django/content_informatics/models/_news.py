from django.conf import settings
from django.db import models
User = settings.AUTH_USER_MODEL


class News(models.Model):

    news_owner = models.ForeignKey(User,
                                   related_name='user_news',
                                   on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=50,
                            blank=True,
                            null=True)

    description = models.TextField(blank=True,
                                   null=True)

    isPublished = models.BooleanField(default=False)

    FIX = "FIX"
    UPDATE = "UPDATE"
    NEW_FEATURE = "NEW_FEATURE"

    TOPIC_TYPES = (
        (FIX, "Fix"),
        (UPDATE, "Update"),
        (NEW_FEATURE, "New Feature"),
    )

    topic = models.CharField(max_length=22,
                             choices=TOPIC_TYPES,
                             default=UPDATE)

    def __str__(self):
        return '{0}'.format(self.name)
