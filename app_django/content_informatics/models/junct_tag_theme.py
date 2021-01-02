from django.db import models
from ._theme import Theme
from ._informatics_tag import Informatics_Tag


class Junct_InformaticsTag_Theme(models.Model):

    tagged_theme = models.ForeignKey(Theme,
                                     related_name='tagged_theme',
                                     on_delete=models.CASCADE)

    theme_informatics_tag = models.ForeignKey(Informatics_Tag,
                                              related_name='theme_informatics_tag',
                                              on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tagged_theme', 'theme_informatics_tag')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_theme, self.theme_informatics_tag)
