from .serializers import *
from .serializers_junct import *
from django.db.models import Q
from content_users.models._userDjEx import UserDjEx
from content_users.api.serializers import UserDjExSerializer
from content_users.models.junct_rate_user import Junct_Rate_User
from content_users.models.junct_sub_user import Junct_Sub_User
from content_users.models.junct_tag_user import Junct_PhylumTag_User
from content_users.api.serializers_junct import Junct_Rate_User_Serializer
from content_users.api.serializers_junct import Junct_Sub_User_Serializer
from content_users.api.serializers_junct import Junct_Tag_User_Serializer


class Dicts:
    # pass

    # ----------
    #   Informatics
    # ----------

    @staticmethod
    def Informatics(informatics):
        _dict = {
            "user": UserDjEx,
            "addon": Addon,
            "deed": Deed,
            "feedback": Feedback,
            "feedback_response": Feedback_Response,
            "news": News,
            "theme": Theme,
        }
        return _dict[informatics]

    @staticmethod
    def Informatics_Serializer(informatics):
        _dict = {
            "user": UserDjExSerializer,
            "addon": AddonSerializer,
            "deed": DeedSerializer,
            "feedback": Feedback,
            "feedback_response": Feedback_ResponseSerializer,
            "news": NewsSerializer,
            "theme": ThemeSerializer,
        }
        return _dict[informatics]

    # -------
    #   Sub
    # -------

    @staticmethod
    def Junct_Sub(informatics):
        _dict = {
            "addon": Junct_Sub_Addon,
            "theme": Junct_Sub_Theme,
        }
        return _dict[informatics]

    @staticmethod
    def Junct_Sub_Q_S(informatics, id):
        _dict = {
            "addon": Q(subbingUser_Addon=id),
            "theme": Q(subbingUser_Theme=id),
        }
        return _dict[informatics]

    @staticmethod
    def Junct_Sub_Q_DO(informatics, id):
        _dict = {
            "addon": Q(subbedAddon=id),
            "theme": Q(subbedTheme=id),
        }
        return _dict[informatics]

    @staticmethod
    def Junct_Sub_Serializer(informatics):
        _dict = {
            "addon": Junct_Sub_Addon_Serializer,
            "theme": Junct_Sub_Theme_Serializer,
        }
        return _dict[informatics]

    # -------
    #   Tag
    # -------

    @staticmethod
    def Junct_Tag(informatics):
        _dict = {
            "addon": Junct_InformaticsTag_Addon,
            "news": Junct_InformaticsTag_News,
            "theme": Junct_InformaticsTag_Theme,
        }
        return _dict[informatics]

    @staticmethod
    def Junct_Tag_Q_S(informatics, id):
        _dict = {
            "addon": Q(tagged_addon__id=id),
            "news": Q(tagged_news__id=id),
            "theme": Q(tagged_theme__id=id),
        }
        return _dict[informatics]

    @staticmethod
    def Junct_Tag_Q_DO(informatics, tagName):
        _dict = {
            "addon": Q(addon_informatics_tag__name=tagName),
            "news": Q(news_informatics_tag__name=tagName),
            "theme": Q(theme_informatics_tag__name=tagName),
        }
        return _dict[informatics]

    @staticmethod
    def Junct_Tag_Serializer(informatics):
        _dict = {
            "addon": Junct_Tag_Addon_Serializer,
            "news": Junct_InformaticsTag_News_Serializer,
            "theme": Junct_InformaticsTag_Theme_Serializer,
        }
        return _dict[informatics]

    # -------
    #   Img
    # -------

    @staticmethod
    def Junct_Img(informatics):
        _dict = {
            "addon": Junct_Img_Addon,
            "feedback": Junct_Img_Feedback,
            "feedback_response": Junct_Img_Feedback_Response,
            "news": Junct_Img_News,
            "theme": Junct_Img_Theme,
        }
        return _dict[informatics]
