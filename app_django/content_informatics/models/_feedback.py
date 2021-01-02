from django.conf import settings
from django.db import models
User = settings.AUTH_USER_MODEL


class Feedback(models.Model):

    feedback_owner = models.ForeignKey(User,
                                       related_name='user_feedback',
                                       on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=50,
                            blank=True,
                            null=True)

    description = models.TextField(blank=True,
                                   null=True)

    CCPICK = "CCPICK"
    DECK = "DECK"
    FORMAT = "FORMAT"
    GEN_APK = "GEN_APK"
    GEN_EXE = "GEN_EXE"
    GEN_WEB = "GEN_WEB"
    GROUPDECK = "GROUPDECK"
    NOTE = "NOTE"
    STORE = "STORE"
    USER = "USER"

    TOPIC_TYPES = (
        (CCPICK, "Ccpick"),
        (DECK, "Deck"),
        (FORMAT, "Format"),
        (GEN_APK, "General for mobile app"),
        (GEN_EXE, "General for desktop app"),
        (GEN_WEB, "General for website"),
        (GROUPDECK, "Groupdeck"),
        (NOTE, "Note"),
        (STORE, "Store"),
        (USER, "User"),
    )

    topic = models.CharField(max_length=22,
                             choices=TOPIC_TYPES,
                             default=DECK)

    POSITIVE = "POSITIVE"
    HELP = "HELP"
    BUG = "BUG"
    CRASH = "CRASH"
    DANGER = "DANGER"

    DEFCON_TYPES = (
        (POSITIVE, "Positive"),
        (HELP, "Help"),
        (BUG, "Bug"),
        (CRASH, "Crash"),
        (DANGER, "Danger"),
    )

    defcon = models.CharField(max_length=8,
                              choices=DEFCON_TYPES,
                              default=BUG)

    def __str__(self):
        return '{0}'.format(self.feedback_owner)

    # def user_directory_path(instance, filename):
    #     # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    #     return 'user_{0}/{1}'.format(instance.user.id, filename)
