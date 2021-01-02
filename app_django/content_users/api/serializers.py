from rest_framework import serializers
from .serializers_junct import *

from ..models._userApk import UserApk
from ..models._userDjEx import UserDjEx
from ..models._userExe import UserExe
from ..models._userStat import UserStat
from ..models._userWeb import UserWeb

from content_phylums.api.serializers import PhylumTagSerializer
from django.conf import settings


# --------
#   MAIN
# --------


class UserDjExSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=False)
    tags = serializers.SerializerMethodField(read_only=True)
    # tags = PhylumTagSerializer(many=True, read_only=True)
    # icon = serializers.SerializerMethodField()
    posRatings_cnt = serializers.SerializerMethodField()
    subscribers_cnt = serializers.SerializerMethodField()
    your_subscriptions_cnt = serializers.SerializerMethodField()
    your_posRatings_cnt = serializers.SerializerMethodField()
    u_subbed = serializers.SerializerMethodField()
    u_liked = serializers.SerializerMethodField()

    class Meta:
        model = UserDjEx
        fields = (
            'id',
            'username',
            'email',
            'date_joined',
            'last_login',
            'description',
            'icon',
            'subscribers_cnt',
            'your_subscriptions_cnt',
            'posRatings_cnt',
            'your_posRatings_cnt',
            'tags',
            'u_subbed',
            'u_liked',
        )
        # fields = ('__all__')
        
    # def get_icon(self, obj):
    #     return settings.IMG_URL + str(obj.icon)

    def get_tags(self, obj):
        junct_tag = Junct_PhylumTag_User.objects.filter(tagged_user=obj)
        tags = []

        for junct in junct_tag:
            tag_serialized = PhylumTagSerializer(junct.user_phylum_tag)
            tags.append(tag_serialized.data)
        return tags

    def get_subscribers_cnt(self, obj):
        return obj.your_subscriptions.count()

    def get_posRatings_cnt(self, obj):
        return obj.your_posRatings.count()

    def get_your_subscriptions_cnt(self, obj):
        return obj.subscribers.count()

    def get_your_posRatings_cnt(self, obj):
        return obj.posRatings.count()

    def get_u_subbed(self, obj):       
        asker_id = self.context.get("request.user.id")
        if (asker_id != None): 
            sub = Junct_Sub_User.objects.filter(
                    subbingUser_User=asker_id).filter(
                        subbedUser=obj.id).first()
            if (sub is not None):
                return 1
            else:
                return 0

        asker_id = self.context.get("asker_id")
        if (asker_id != None): 
            sub = Junct_Sub_User.objects.filter(
                    subbingUser_User=asker_id).filter(
                        subbedUser=obj.id).first()
            if (sub is not None):
                return 1
        return 0

    def get_u_liked(self, obj):        
        asker_id = self.context.get("request.user.id")
        if (asker_id != None): 
            rate = Junct_Rate_User.objects.filter(
                    ratingUser_User=asker_id).filter(
                        ratedUser=obj.id).first()
            # print("SELF: ", rate)
            if (rate is not None):
                return 1
            else:
                return 0

        asker_id = self.context.get("asker_id")
        if (asker_id != None): 
            rate = Junct_Rate_User.objects.filter(
                    ratingUser_User=asker_id).filter(
                        ratedUser=obj.id).first()
            # print("SELF: ", rate)
            if (rate is not None):
                return 1
        return 0


# -------
#   AUX
# -------


class UserApkSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserApk
        fields = ('__all__')


class UserExeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserExe
        fields = ('__all__')


class UserWebSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserWeb
        fields = ('__all__')


class UserStatSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserStat
        fields = ('__all__')


# -----------
#   OLD REF
# -----------


# class UserDjExSerializer(serializers.ModelSerializer):
#     subscribers_cnt = serializers.SerializerMethodField()
#     your_subscriptions_cnt = serializers.SerializerMethodField()
#     posRatings_cnt = serializers.SerializerMethodField()
#     your_posRatings_cnt = serializers.SerializerMethodField()
#     # username = serializers.SerializerMethodField()
#     # email = serializers.SerializerMethodField()
#     # last_login = serializers.SerializerMethodField()
#     # date_joined = serializers.SerializerMethodField()
#     # first_name = serializers.SerializerMethodField()
#     # last_name = serializers.SerializerMethodField()
#     # changing subbedUser to subbingUser will fetch
#     #   the other respective data from the junct table
#     subbingUser_User = Junct_SubsSerializer(many=True)
#     ratingUser_User = Junct_RatingsSerializer(many=True)
#     tagged_user = Junct_TagsSerializer(many=True)

#     class Meta:
#         model = UserDjEx
#         fields = ('username', 'email', 'id', 'last_login',
#                   'date_joined', 'first_name', 'last_name',
#                   'icon', 'description',
#                   'subscribers_cnt', 'posRatings_cnt',
#                   'your_subscriptions_cnt', 'your_posRatings_cnt',
#                   'subbingUser_User', 'ratingUser_User', 'tagged_user')


#     # def get_username(self, obj):
#     #     return obj.user.username

#     # def get_email(self, obj):
#     #     return obj.user.email

#     # def get_last_login(self, obj):
#     #     return obj.user.last_login

#     # def get_date_joined(self, obj):
#     #     return obj.user.date_joined

#     # def get_first_name(self, obj):
#     #     return obj.user.first_name

#     # def get_last_name(self, obj):
#     #     return obj.user.last_name

#     def get_subscribers_cnt(self, obj):
#         return obj.subscribers.count()

#     def get_posRatings_cnt(self, obj):
#         return obj.posRatings.count()

#     def get_your_subscriptions_cnt(self, obj):
#         return obj.your_subscriptions.count()

#     def get_your_posRatings_cnt(self, obj):
#         return obj.your_posRatings.count()
