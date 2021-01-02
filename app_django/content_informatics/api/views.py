from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser

from content_users.models._userDjEx import UserDjEx
from content_users.api.serializers import UserDjExSerializer
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


from .serializers import *
from .serializers_junct import *
from .serializers_custom import Serialize_Imgs

# ----------
#   CUSTOM
# ----------


class StoreSearch(APIView):

    def get(self, request):

        params = {
            'name': request.query_params.getlist('name'),
            'phylums': request.query_params.getlist('phylums'),
            'tags': request.query_params.getlist('tags')
        }

        context = {
            'deed_data': StoreSearch_TaskMaster('deed', params),
            'addon_data': StoreSearch_TaskMaster('addon', params),
            'theme_data': StoreSearch_TaskMaster('theme', params),
        }

        print("PARAMS: ", params)
        print("CONTEXT: ", context)
        return Response(context)


#        ----------
#          SUB_Fx
#        ----------


def StoreSearch_TaskMaster(phylum, params):
    if phylum in params['phylums']:
        return StoreSearch_Searcher(phylum, params['name'], params['phylums'], params['tags'])
    else:
        return None


def StoreSearch_Searcher(phylum, name, phylums, tags):
    result = None

    Serializer_Dict = {
        "deed": DeedSerializer,
        "addon": AddonSerializer,
        "theme": ThemeSerializer,
    }

    Obj_Dict = {
        "deed": Deed,
        "addon": Addon,
        "theme": Theme,
    }

    if name and not tags:
        print("NAME SEARCH", bool(tags), bool(name))
        qs = Obj_Dict[phylum].objects.filter(name__contains=name)
        result = Serializer_Dict[phylum](qs, many=True)

    elif tags and not name:
        print("TAGS SEARCH", bool(tags), bool(name))
        qs = Obj_Dict[phylum].objects.filter(phylum_tags__in=tags)
        result = Serializer_Dict[phylum](qs, many=True)

    elif name and tags:
        print("BOTH SEARCH", bool(tags), bool(name))
        qs = Obj_Dict[phylum].objects.filter(
            name__contains=name).filter(phylum_tags__in=tags)
        result = Serializer_Dict[phylum](qs, many=True)

    elif not name and not tags:
        print("NEITHER SEARCH", bool(tags), bool(name))
        qs = Obj_Dict[phylum].objects.all()
        result = Serializer_Dict[phylum](qs, many=True)

    return result.data if result else None


# ---------------
#   INFORMATICS
# ---------------


class AddonViewSet(viewsets.ModelViewSet):
    serializer_class = AddonSerializer
    # queryset = Addon.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Addon.objects.filter(isPublished=True)
        else:
            return Addon.objects.all()


class DeedViewSet(viewsets.ModelViewSet):
    serializer_class = DeedSerializer
    # queryset = Deed.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Deed.objects.filter(isPublished=True)
        else:
            return Deed.objects.all()


class Feedback_ResponseViewSet(viewsets.ModelViewSet):
    serializer_class = Feedback_ResponseSerializer
    # queryset = Feedback_Response.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("parent_feedback_id"):
            parent = Feedback.objects.get(
                id=self.request.query_params.get("parent_feedback_id"))
            return Feedback_Response.objects.filter(ori_feedback=parent)
        else:
            return Feedback.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        newObj = Feedback_Response.objects.filter(
            feedback_response_owner=request.data.get('feedback_response_owner')).filter(
            ori_feedback__id=request.data.get('ori_feedback')).last()

        Serialize_Imgs("feedback_response",
                       newObj.id,
                       request.FILES)

        return Response(serializer.data, status=201, headers=headers)


class FeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("owner_id"):
            return Feedback.objects.filter(
                feedback_owner=self.request.query_params.get("owner_id"))
        else:
            return Feedback.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        newObj = Feedback.objects.filter(
            name=request.data.get('name')).filter(
            feedback_owner__id=request.data.get('feedback_owner')).last()

        Serialize_Imgs("feedback",
                       newObj.id,
                       request.FILES)

        return Response(serializer.data, status=201, headers=headers)


class Informatics_TagViewSet(viewsets.ModelViewSet):
    serializer_class = Informatics_TagSerializer
    # queryset = Informatics_Tag.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Informatics_Tag.objects.filter(isPublished=True)
        else:
            return Informatics_Tag.objects.all()


class NewsViewSet(viewsets.ModelViewSet):
    serializer_class = NewsSerializer
    # queryset = News.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return News.objects.filter(isPublished=True)
        else:
            return News.objects.all()


class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    # queryset = Theme.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Theme.objects.filter(isPublished=True)
        else:
            return Theme.objects.all()


# ---------
#   JUNCT
# ---------


#           --------
#             IMGS
#           --------


class Junct_Img_AddonViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Img_Addon_Serializer
    queryset = Junct_Img_Addon.objects.all()


class Junct_Img_FeedbackViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = Junct_Img_Feedback_Serializer
    queryset = Junct_Img_Feedback.objects.all()


class Junct_Img_NewsViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Img_News_Serializer
    queryset = Junct_Img_News.objects.all()


class Junct_Img_ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Img_Theme_Serializer
    queryset = Junct_Img_Theme.objects.all()


#           --------
#             SUBS
#           --------


class Junct_Sub_AddonViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Sub_Addon_Serializer
    queryset = Junct_Sub_Addon.objects.all()


class Junct_Sub_ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Sub_Theme_Serializer
    queryset = Junct_Sub_Theme.objects.all()


#           --------
#             TAGS
#           --------


class Junct_InformaticsTag_AddonViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_InformaticsTag_Addon_Serializer
    queryset = Junct_InformaticsTag_Addon.objects.all()


class Junct_InformaticsTag_NewsViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_InformaticsTag_News_Serializer
    queryset = Junct_InformaticsTag_News.objects.all()


class Junct_InformaticsTag_ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_InformaticsTag_Theme_Serializer
    queryset = Junct_InformaticsTag_Theme.objects.all()


#           ---------
#             DEEDS
#           ---------


class Junct_User_DeedViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_User_Deed_Serializer
    queryset = Junct_User_Deed.objects.all()
