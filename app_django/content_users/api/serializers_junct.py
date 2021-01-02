from rest_framework import serializers

from ..models.junct_rate_user import Junct_Rate_User
from ..models.junct_sub_user import Junct_Sub_User
from ..models.junct_tag_user import Junct_PhylumTag_User


class Junct_Rate_User_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Rate_User
        fields = ('__all__')


class Junct_Sub_User_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Sub_User
        fields = ('__all__')


class Junct_Tag_User_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_PhylumTag_User
        fields = ('__all__')
