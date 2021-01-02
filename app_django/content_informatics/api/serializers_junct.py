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
from ..models.junct_img_feedback_response import Junct_Img_Feedback_Response
from ..models.junct_img_news import Junct_Img_News
from ..models.junct_img_theme import Junct_Img_Theme

from ..models.junct_sub_addon import Junct_Sub_Addon
from ..models.junct_sub_theme import Junct_Sub_Theme

from ..models.junct_tag_addon import Junct_InformaticsTag_Addon
from ..models.junct_tag_news import Junct_InformaticsTag_News
from ..models.junct_tag_theme import Junct_InformaticsTag_Theme

from ..models.junct_user_deed import Junct_User_Deed


# ---------
#   IMGS
# ---------


class Junct_Img_Addon_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Img_Addon
        fields = ('__all__')


class Junct_Img_Feedback_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Img_Feedback
        fields = ('__all__')


class Junct_Img_Feedback_Response_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Img_Feedback_Response
        fields = ('__all__')


class Junct_Img_News_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Img_News
        fields = ('__all__')


class Junct_Img_Theme_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Img_Theme
        fields = ('__all__')


# ---------
#   SUBS
# ---------


class Junct_Sub_Addon_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Sub_Addon
        fields = ('__all__')


class Junct_Sub_Theme_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Sub_Theme
        fields = ('__all__')


# ---------
#   TAGS
# ---------


class Junct_InformaticsTag_Addon_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_InformaticsTag_Addon
        fields = ('__all__')


class Junct_InformaticsTag_News_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_InformaticsTag_News
        fields = ('__all__')


class Junct_InformaticsTag_Theme_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_InformaticsTag_Theme
        fields = ('__all__')


# ---------
#   DEEDS
# ---------


class Junct_User_Deed_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_User_Deed
        fields = ('__all__')
