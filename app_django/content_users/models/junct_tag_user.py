from content_phylums.models._phylum_tag import Phylum_Tag
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Junct_PhylumTag_User(models.Model):

    tagged_user = models.ForeignKey(User,
                                    related_name='tagged_user',
                                    on_delete=models.CASCADE)

    user_phylum_tag = models.ForeignKey(Phylum_Tag,
                                        related_name='user_phylum_tag',
                                        on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tagged_user', 'user_phylum_tag')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_user, self.user_phylum_tag)
