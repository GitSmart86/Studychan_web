from django.db import models
from ._news import News
from ._informatics_tag import Informatics_Tag


class Junct_InformaticsTag_News(models.Model):

    tagged_news = models.ForeignKey(News,
                                    related_name='tagged_news',
                                    on_delete=models.CASCADE)

    news_informatics_tag = models.ForeignKey(Informatics_Tag,
                                             related_name='news_informatics_tag',
                                             on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tagged_news', 'news_informatics_tag')

    def __str__(self):
        return '%s _Tag:_ %s' % (self.tagged_news, self.news_informatics_tag)
