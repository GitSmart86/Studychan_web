from rest_framework import serializers
from django.db import models

from ..models._addon import Addon
from ..models._deed import Deed
from ..models._feedback_response import Feedback_Response
from ..models._feedback import Feedback
from ..models._informatics_tag import Informatics_Tag
from ..models._news import News
from ..models._theme import Theme

from ..models.junct_img_addon import Junct_Img_Addon
from ..models.junct_img_feedback import Junct_Img_Feedback
from ..models.junct_img_news import Junct_Img_News
from ..models.junct_img_theme import Junct_Img_Theme

from ..models.junct_sub_addon import Junct_Sub_Addon
from ..models.junct_sub_theme import Junct_Sub_Theme

from ..models.junct_tag_addon import Junct_InformaticsTag_Addon
from ..models.junct_tag_news import Junct_InformaticsTag_News
from ..models.junct_tag_theme import Junct_InformaticsTag_Theme

from ..models.junct_user_deed import Junct_User_Deed

from .serializers_junct import *
from .serializers_custom import User_Owner_SerializerField


class AddonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    subbedAddon = Junct_Sub_Addon_Serializer(many=True)
    tagged_addon = Junct_InformaticsTag_Addon_Serializer(many=True)
    addon_img = Junct_Img_Addon_Serializer(many=True, required=False,)

    class Meta:
        model = Addon
        fields = ('__all__')


class DeedSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    deed_holder = Junct_User_Deed_Serializer(many=True)

    class Meta:
        model = Deed
        fields = ('__all__')


class FeedbackSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    feedback_img = Junct_Img_Feedback_Serializer(many=True, required=False)

    class Meta:
        model = Feedback
        fields = ('__all__')


class Feedback_ResponseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    feedback_response_owner = User_Owner_SerializerField()
    feedback_response_img = Junct_Img_Feedback_Response_Serializer(
        many=True, required=False,)

    class Meta:
        model = Feedback_Response
        fields = ('__all__')


class Informatics_TagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Informatics_Tag
        fields = ('__all__')


class NewsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    news_img = Junct_Img_News_Serializer(many=True, required=False)
    tagged_news = Junct_InformaticsTag_News_Serializer(many=True)

    class Meta:
        model = News
        fields = ('__all__')


class ThemeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    theme_img = Junct_Img_Theme_Serializer(many=True, required=False)
    subbedTheme = Junct_Sub_Theme_Serializer(many=True)
    tagged_theme = Junct_InformaticsTag_Theme_Serializer(many=True)

    class Meta:
        model = Theme
        fields = ('__all__')
