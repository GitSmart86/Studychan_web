from django.db.models import Q
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from ..models._userApk import UserApk
from ..models._userDjEx import UserDjEx
from ..models._userExe import UserExe
from ..models._userStat import UserStat
from ..models._userWeb import UserWeb
from ..models.junct_rate_user import Junct_Rate_User
from ..models.junct_sub_user import Junct_Sub_User
from ..models.junct_tag_user import Junct_PhylumTag_User

# from content_phylums.models._ccpick import Ccpick
# from content_phylums.models._deck import Deck
# from content_phylums.models._groupdeck import Groupdeck
# from content_phylums.models._note import Note
# from content_phylums.models._format import Format
from content_phylums.models._phylum_tag import Phylum_Tag

# from content_phylums.api.serializers import CcpickSerializer
# from content_phylums.api.serializers import DeckSerializer
# from content_phylums.api.serializers import GroupDeckSerializer
# from content_phylums.api.serializers import NoteSerializer
# from content_phylums.api.serializers import FormatSerializer
from content_phylums.api.serializers import PhylumTagSerializer

from .serializers import *
from .serializers_junct import *
from .serializers_custom import Serialize_Tags
from rest_framework.parsers import MultiPartParser, FormParser


# ----------
#   CUSTOM
# ----------

# "Access-Control-Allow-Origin": "*",


# @xframe_options_exempt
class ObtainUserData(APIView):

    def get(self, request):  # , request

        id = self.request.query_params.get('id', None)
        asker_id = self.request.query_params.get('masker_id', None)

        qs = UserDjEx.objects.get(id=id) or None
        userData = UserDjExSerializer(qs, context={"asker_id": self.request.user.id}).data
        # userData = qsSerialized.data

        userTagIds = Junct_PhylumTag_User.objects.filter(tagged_user=id)
        userTags = []

        for junct in userTagIds:
            qs = Phylum_Tag.objects.get(id=junct.user_phylum_tag.id)
            tagSerialized = PhylumTagSerializer(qs)
            userTags.append(tagSerialized.data)

        userSubIds = Junct_Sub_User.objects.filter(subbingUser_User=id)
        userSubs = []

        for junct in userSubIds:
            qs = UserDjEx.objects.get(id=junct.subbedUser.id)
            subSerialized = UserDjExSerializer(qs)
            userSubs.append(subSerialized.data)

        context = {
            'userData': userData,
            'userTags': userTags,
            'userSubs': userSubs,
        }

        # print("CONTEXT: ", context)
        return Response(context)


# @xframe_options_exempt
class ObtainAuthUserData(APIView):

    def get(self, request, *args, **kwargs):

        qs = UserDjEx.objects.get(username=request.user)
        serializer = UserDjExSerializer(qs)
        # print("DATA: ", serializer.data)
        context = {
            'id': serializer.data.get('id'),
            'username': serializer.data.get('username'),
            'icon': serializer.data.get('icon') or None
        }

        return Response(context)


# --------
#   USER
# --------


# @xframe_options_exempt
class UserDjExViewSet(viewsets.ModelViewSet):
    serializer_class = UserDjExSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = UserDjEx.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        if request.FILES:
            Serialize_Tags("user",
                           request.POST.get("id", ""),
                           request.POST.get("tags", ""))


        return Response(serializer.data)


class UserApkViewSet(viewsets.ModelViewSet):
    serializer_class = UserApkSerializer
    queryset = UserApk.objects.all()


class UserExeViewSet(viewsets.ModelViewSet):
    serializer_class = UserExeSerializer
    queryset = UserExe.objects.all()


class UserWebViewSet(viewsets.ModelViewSet):
    serializer_class = UserWebSerializer
    queryset = UserWeb.objects.all()


class UserStatViewSet(viewsets.ModelViewSet):
    serializer_class = UserStatSerializer
    queryset = UserStat.objects.all()


# ---------
#   JUNCT
# ---------


class Junct_RatingsViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rate_User_Serializer
    queryset = Junct_Rate_User.objects.all()


class Junct_SubsViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Sub_User_Serializer
    queryset = Junct_Sub_User.objects.all()


class Junct_TagsViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Tag_User_Serializer
    queryset = Junct_PhylumTag_User.objects.all()
