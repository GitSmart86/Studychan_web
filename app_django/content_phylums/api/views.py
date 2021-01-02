from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

# from content_users.models._userDjEx import UserDjEx
from content_users.api.serializers import UserDjExSerializer
# from content_users.models.junct_rate_user import Junct_Rate_User
# from content_users.models.junct_sub_user import Junct_Sub_User
# from content_users.api.serializers_junct import Junct_Rate_User_Serializer
# from content_users.api.serializers_junct import Junct_Sub_User_Serializer

from ..models._ccpick import Ccpick
from ..models._deck import Deck
from ..models._format import Format
from ..models._groupdeck import Groupdeck
from ..models._note import Note
from ..models._phylum_tag import Phylum_Tag

from ..models.junct_img_ccpick import Junct_Img_Ccpick
from ..models.junct_img_note import Junct_Img_Note

from ..models.junct_rate_ccpick import Junct_Rate_Ccpick
from ..models.junct_rate_deck import Junct_Rate_Deck
from ..models.junct_rate_format import Junct_Rate_Format
from ..models.junct_rate_groupdeck import Junct_Rate_Groupdeck
from ..models.junct_rate_note import Junct_Rate_Note

from ..models.junct_rev_deck import Junct_Rev_Deck
from ..models.junct_rev_groupdeck import Junct_Rev_Groupdeck
from ..models.junct_rev_note import Junct_Rev_Note

from ..models.junct_snd_note import Junct_Snd_Note

from ..models.junct_sub_deck import Junct_Sub_Deck
from ..models.junct_sub_groupdeck import Junct_Sub_Groupdeck
from ..models.junct_sub_note import Junct_Sub_Note

from ..models.junct_tag_ccpick import Junct_PhylumTag_Ccpick
from ..models.junct_tag_deck import Junct_PhylumTag_Deck
from ..models.junct_tag_format import Junct_PhylumTag_Format
from ..models.junct_tag_groupdeck import Junct_PhylumTag_Groupdeck
from ..models.junct_tag_note import Junct_PhylumTag_Note

from .serializers import *
from .serializers_junct import *
from .serializers_dict import Dicts

from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers_custom import Serialize_Tags, Serialize_Imgs, Serialize_Snds


# ----------
#   CUSTOM
# ----------


class Viewer_Rate(APIView):

    def post(self, request, phylum, id, rateType, *args, **kwargs):
        result = "liked" if (rateType == "pos") else "disliked"
        rating = Dicts.Junct_Rate(phylum).objects.filter(Dicts.Junct_Rate_Q_S(
            phylum, request.user)).filter(Dicts.Junct_Rate_Q_DO(phylum, id))

        print("RATING: ", rating.first())

        # always remove pre-existing rate
        if rating.exists():
            rating = rating.first()
            print("IS POS_RATE: ", rating.posRating)
            ratingType = rating.posRating

            if rateType == "pos" and ratingType is True:
                rating.delete()
                return Response("nulled like")

            elif rateType == "neg" and ratingType is False:
                rating.delete()
                return Response("nulled dislike")

            elif rateType == "pos" and ratingType is False:
                rating.delete()
                result = "nulled dislike and liked"

            elif rateType == "neg" and ratingType is True:
                rating.delete()
                result = "nulled like and disliked"

        # optionally create new rate
        DO = Dicts.Phylum(phylum).objects.get(id=id)
        isPos = True if (rateType == "pos") else False

        if phylum == "user":
            Dicts.Junct_Rate(phylum).objects.create(
                ratingUser_User=request.user, ratedUser=DO, posRating=isPos)

        elif phylum == "ccpick":
            Dicts.Junct_Rate(phylum).objects.create(
                ratingUser_Ccpick=request.user, ratedCcpick=DO, posRating=isPos)

        elif phylum == "deck":
            Dicts.Junct_Rate(phylum).objects.create(
                ratingUser_Deck=request.user, ratedDeck=DO, posRating=isPos)

        elif phylum == "format":
            Dicts.Junct_Rate(phylum).objects.create(
                ratingUser_Format=request.user, ratedFormat=DO, posRating=isPos)

        elif phylum == "groupdeck":
            Dicts.Junct_Rate(phylum).objects.create(
                ratingUser_Groupdeck=request.user, ratedGroupdeck=DO, posRating=isPos)

        elif phylum == "note":
            Dicts.Junct_Rate(phylum).objects.create(
                ratingUser_Note=request.user, ratedNote=DO, posRating=isPos)

        return Response(result)


class Viewer_Subscribe(APIView):

    def post(self, request, phylum, id, *args, **kwargs):
        result = ""

        subscription = Dicts.Junct_Sub(phylum).objects.filter(Dicts.Junct_Sub_Q_S(
            phylum, request.user)).filter(Dicts.Junct_Sub_Q_DO(phylum, id))

        if subscription.exists():

            result = "unsubscribed"
            subscription = subscription.first()
            subscription.delete()

        else:
            result = "subscribed"
            DO = Dicts.Phylum(phylum).objects.get(id=id)

            if phylum == "user":
                Dicts.Junct_Sub(phylum).objects.create(
                    subbingUser_User=request.user, subbedUser=DO)

            elif phylum == "deck":
                Dicts.Junct_Sub(phylum).objects.create(
                    subbingUser_Deck=request.user, subbedDeck=DO)

            elif phylum == "format":
                Dicts.Junct_Sub(phylum).objects.create(
                    subbingUser_Format=request.user, subbedFormat=DO)

            elif phylum == "groupdeck":
                Dicts.Junct_Sub(phylum).objects.create(
                    subbingUser_Groupdeck=request.user, subbedGroupdeck=DO)

            elif phylum == "note":
                Dicts.Junct_Sub(phylum).objects.create(
                    subbingUser_Note=request.user, subbedNote=DO)

        return Response(result)


class SubDatabaseSearch(APIView):

    def get(self, request):

        subberId = request.query_params.get('subberid', None)
        phylum = request.query_params.get('phylum', None)

        subs = Dicts.Junct_Sub(phylum).objects.filter(
            Dicts.Junct_Sub_Q_S(phylum, subberId))
        context = []

        for sub in subs:
            subbed_content = object

            if phylum == "user":
                subbed_content = sub.subbedUser
            elif phylum == "ccpick":
                subbed_content = sub.subbedCcpick
            elif phylum == "deck":
                subbed_content = sub.subbedDeck
            elif phylum == "groupdeck":
                subbed_content = sub.subbedGroupdeck
            elif phylum == "note":
                subbed_content = sub.subbedNote
            elif phylum == "format":
                subbed_content = sub.subbedFormat

            content_serialized = Dicts.Phylum_Serializer(phylum)(
                subbed_content)

            context.append(content_serialized.data)

        print("CONTEXT: ", context)
        return Response(context)


class RateDatabaseSearch(APIView):

    def get(self, request):

        raterId = request.query_params.get('raterid', None)
        phylum = request.query_params.get('phylum', None)

        rates = Dicts.Junct_Rate(phylum).objects.filter(
            Dicts.Junct_Rate_Q_S(phylum, raterId))
        context = []

        for rate in rates:
            reviewed_content = object

            if phylum == "user":
                reviewed_content = rate.ratedUser
            elif phylum == "ccpick":
                reviewed_content = rate.ratedCcpick
            elif phylum == "deck":
                reviewed_content = rate.ratedDeck
            elif phylum == "groupdeck":
                reviewed_content = rate.ratedGroupdeck
            elif phylum == "note":
                reviewed_content = rate.ratedNote
            elif phylum == "format":
                reviewed_content = rate.ratedFormat

            content_serialized = Dicts.Phylum_Serializer(phylum)(
                reviewed_content)
            review_serialized = Dicts.Junct_Rate_Serializer(phylum)(rate)

            result_pair = {
                "content": content_serialized.data,
                "rate": review_serialized.data,
            }

            context.append(result_pair)

        print("CONTEXT: ", context)
        return Response(context)


class RevDatabaseSearch(APIView):

    def get(self, request):

        phylumId = request.query_params.get('phylumid', None)
        reviewerId = request.query_params.get('reviewerid', None)
        phylum = request.query_params.get('phylum', None)

        reviews = []
        context = []

        if reviewerId is not None:
            reviews = Dicts.Junct_Rev(phylum).objects.filter(
                Dicts.Junct_Rev_Q_S(phylum, reviewerId))
        else:
            reviews = Dicts.Junct_Rev(phylum).objects.filter(
                Dicts.Junct_Rev_Q_DO(phylum, phylumId))

        for review in reviews:
            review_serialized = Dicts.Junct_Rev_Serializer(phylum)(review)

            reviewed_content = object
            content_serialized = object

            if phylum == "deck":
                if reviewerId is not None:
                    reviewed_content = review.reviewedDeck
                else:
                    reviewed_content = review.reviewingUser_Deck

            elif phylum == "groupdeck":
                if reviewerId is not None:
                    reviewed_content = review.reviewedGroupdeck
                else:
                    reviewed_content = review.reviewingUser_Groupdeck

            elif phylum == "note":
                if reviewerId is not None:
                    reviewed_content = review.reviewedNote
                else:
                    reviewed_content = review.reviewingUser_Note

            if reviewerId is not None:
                content_serialized = Dicts.Phylum_Serializer(phylum)(
                    reviewed_content)
            else:
                content_serialized = UserDjExSerializer(reviewed_content)

            result_pair = {
                "content": content_serialized.data,
                "review": review_serialized.data,
            }

            context.append(result_pair)

        print("CONTEXT: ", context)
        return Response(context)


class UserDatabaseSearch(APIView):

    def get(self, request):

        ownerId = request.query_params.get('ownerId', None)
        phylum = request.query_params.get('phylum', None)
        isPublished = request.query_params.get('isPublished', True)
        isPublished = True if isPublished == "true" else False

        qs = Dicts.Phylum(phylum).objects.filter(
            owner__id=ownerId).filter(isPublished=isPublished)
        print(qs)
        contextSerialized = Dicts.Phylum_Serializer(phylum)(qs, many=True)
        context = contextSerialized.data

        print("CONTEXT: ", context)
        return Response(context)


class DatabaseSearch(APIView):

    def get(self, request):
        params = {
            'namid': request.query_params.get('namid'),
            'phylums': request.query_params.getlist('phylums'),
            'tags': request.query_params.getlist('tags'),
            'asker_id': self.request.user.id,
        }

        context = {
            'user_data': DBSearch_TaskMaster('user', params),
            'ccpick_data': DBSearch_TaskMaster('ccpick', params),
            'deck_data': DBSearch_TaskMaster('deck', params),
            'format_data': DBSearch_TaskMaster('format', params),
            'groupdeck_data': DBSearch_TaskMaster('groupdeck', params),
            'note_data': DBSearch_TaskMaster('note', params),
        }

        # print("CONTEXT: ", context)
        return Response(context)


#        ----------
#          SUB_Fx
#        ----------


def DBSearch_TaskMaster(phylum, params):
    if phylum in params['phylums']:
        return DBSearch_Searcher(phylum, params['namid'], params['phylums'], params['tags'], params['asker_id'])
    else:
        return None


def DBSearch_Searcher(phylum, namid, phylums, tags, asker_id):
    result = None

    if namid and namid.isnumeric():
        print("NUMERIC SEARCH")
        qs = Dicts.Phylum(phylum).objects.filter(id=namid)
        result = Dicts.Phylum_Serializer(phylum)(qs, many=True)

    else:

        # asker_id = self.context.get("asker_id")
        # if (asker_id != None): 

        if namid and not tags:
            # print("NAMID SEARCH", bool(tags), bool(namid))
            # user_username__startswith=namid
            userQ = Q(username__contains=namid)
            contentQ = Q(name__contains=namid)
            q = userQ if phylum == "user" else contentQ
            qs = Dicts.Phylum(phylum).objects.filter(q)
            result = Dicts.Phylum_Serializer(phylum)(qs, many=True, context={"request.user.id": asker_id})

        elif tags and not namid:
            # print("TAGS SEARCH", bool(tags), bool(namid))
            qs = Dicts.Phylum(phylum).objects.filter(
                phylum_tags__name__in=tags)
            result = Dicts.Phylum_Serializer(phylum)(qs, many=True, context={"request.user.id": asker_id})

        elif namid and tags:
            # print("BOTH SEARCH", bool(tags), bool(namid))
            qs = Dicts.Phylum(phylum).objects.filter(
                name__contains=namid).filter(phylum_tags__name__in=tags)
            result = Dicts.Phylum_Serializer(phylum)(qs, many=True, context={"request.user.id": asker_id})

        elif not namid and not tags:
            # print("NEITHER SEARCH", bool(tags), bool(namid))
            qs = Dicts.Phylum(phylum).objects.all()
            result = Dicts.Phylum_Serializer(phylum)(qs, many=True, context={"request.user.id": asker_id})

    return result.data if result else None


# ----------
#   PHYLUM
# ----------

# content_type="application/liquid; charset=utf-8"

class PhylumTagViewSet(viewsets.ModelViewSet):
    serializer_class = PhylumTagSerializer

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Phylum_Tag.objects.filter(isPublished=True)
        else:
            return Phylum_Tag.objects.all()


class CcpickViewSet(viewsets.ModelViewSet):
    serializer_class = CcpickSerializer
    # parser_classes = (MultiPartParser, FormParser)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)

    #     newObj_phylum = request.POST.get("phylum", "")

    #     newObj = Dicts.Phylum(newObj_phylum).objects.filter(
    #         name=request.data.get('name')).filter(
    #         owner__id=request.data.get('owner')).first()

    #     Serialize_Tags(newObj_phylum,
    #                    newObj.id,
    #                    request.POST.get("tags", ""))

    #     Serialize_Imgs(newObj_phylum,
    #                    newObj.id,
    #                    request.FILES)

    #     return Response(serializer.data, status=201, headers=headers)

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(
    #         instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     if getattr(instance, '_prefetched_objects_cache', None):
    #         # If 'prefetch_related' has been applied to a queryset, we need to
    #         # forcibly invalidate the prefetch cache on the instance.
    #         instance._prefetched_objects_cache = {}

    #     Serialize_Tags(request.POST.get("phylum", ""),
    #                    request.POST.get("id", ""),
    #                    request.POST.get("tags", ""))

    #     Serialize_Imgs(request.POST.get("phylum", ""),
    #                    request.POST.get("id", ""),
    #                    request.FILES)

    #     return Response(serializer.data)

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Ccpick.objects.filter(isPublished=True)
        else:
            return Ccpick.objects.all()


class DeckViewSet(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        newObj_phylum = request.POST.get("phylum", "")

        newObj = Dicts.Phylum(newObj_phylum).objects.filter(
            name=request.data.get('name')).filter(
            owner__id=request.data.get('owner')).first()

        Serialize_Tags(newObj_phylum,
                       newObj.id,
                       request.POST.get("tags", ""))

        return Response(serializer.data, status=201, headers=headers)

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

        Serialize_Tags(request.POST.get("phylum", ""),
                       request.POST.get("id", ""),
                       request.POST.get("tags", ""))
        return Response(serializer.data)

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Deck.objects.filter(isPublished=True)
        else:
            return Deck.objects.all()


class FormatViewSet(viewsets.ModelViewSet):
    serializer_class = FormatSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        newObj_phylum = request.POST.get("phylum", "")

        newObj = Dicts.Phylum(newObj_phylum).objects.filter(
            name=request.data.get('name')).filter(
            owner__id=request.data.get('owner')).first()

        Serialize_Tags(newObj_phylum,
                       newObj.id,
                       request.POST.get("tags", ""))

        return Response(serializer.data, status=201, headers=headers)

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

        Serialize_Tags(request.POST.get("phylum", ""),
                       request.POST.get("id", ""),
                       request.POST.get("tags", ""))
        return Response(serializer.data)

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Format.objects.filter(isPublished=True)
        else:
            return Format.objects.all()


class GroupDeckViewSet(viewsets.ModelViewSet):
    serializer_class = GroupDeckSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        newObj_phylum = request.POST.get("phylum", "")

        newObj = Dicts.Phylum(newObj_phylum).objects.filter(
            name=request.data.get('name')).filter(
            owner__id=request.data.get('owner')).first()

        Serialize_Tags(newObj_phylum,
                       newObj.id,
                       request.POST.get("tags", ""))

        return Response(serializer.data, status=201, headers=headers)

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

        Serialize_Tags(request.POST.get("phylum", ""),
                       request.POST.get("id", ""),
                       request.POST.get("tags", ""))
        return Response(serializer.data)

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Groupdeck.objects.filter(isPublished=True)
        else:
            return Groupdeck.objects.all()


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        newObj_phylum = request.POST.get("phylum", "")

        newObj = Dicts.Phylum(newObj_phylum).objects.filter(
            name=request.data.get('name')).filter(
            owner__id=request.data.get('owner')).first()

        Serialize_Tags(newObj_phylum,
                       newObj.id,
                       request.POST.get("tags", ""))

        Serialize_Imgs(newObj_phylum,
                       newObj.id,
                       request.FILES)

        Serialize_Snds(newObj_phylum,
                       newObj.id,
                       request.FILES)

        return Response(serializer.data, status=201, headers=headers)

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

        Serialize_Tags(request.POST.get("phylum", ""),
                       request.POST.get("id", ""),
                       request.POST.get("tags", ""))

        Serialize_Imgs(request.POST.get("phylum", ""),
                       request.POST.get("id", ""),
                       request.FILES)

        Serialize_Snds(request.POST.get("phylum", ""),
                       request.POST.get("id", ""),
                       request.FILES)

        return Response(serializer.data)

    # def get_serializer_class(self):
    #     if self.request.method in ['GET']:
    #         print("GET")
    #         return NoteReadSerializer
    #     else:
    #         return NoteSerializer

    def get_queryset(self):
        if self.request.query_params.get("isPublished") == "true":
            return Note.objects.filter(isPublished=True)
        else:
            return Note.objects.all()

# ---------
#   JUNCT
# ---------


#           --------
#             IMGS
#           --------


class Junct_Img_CcpickViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Img_Ccpick_Serializer
    queryset = Junct_Img_Ccpick.objects.all()


class Junct_Img_NoteViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Img_Note_Serializer
    queryset = Junct_Img_Note.objects.all()


#           ---------
#             RATES
#           ---------


class Junct_Rate_CcpickViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rate_Ccpick_Serializer
    queryset = Junct_Rate_Ccpick.objects.all()


class Junct_Rate_DeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rate_Deck_Serializer
    queryset = Junct_Rate_Deck.objects.all()


class Junct_Rate_FormatViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rate_Format_Serializer
    queryset = Junct_Rate_Format.objects.all()


class Junct_Rate_GroupdeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rate_Groupdeck_Serializer
    queryset = Junct_Rate_Groupdeck.objects.all()


class Junct_Rate_NoteViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rate_Note_Serializer
    queryset = Junct_Rate_Note.objects.all()


#           --------
#             REVS
#           --------


class Junct_Rev_DeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rev_Deck_Serializer
    # queryset = Junct_Rev_Deck.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("mode") == "personal":
            reviewerId = self.request.query_params.get("reviewerId")
            reviewedId = self.request.query_params.get("reviewedId")
            return Junct_Rev_Deck.objects.filter(reviewingUser_Deck__id=reviewerId
                                                 ).filter(reviewedDeck__id=reviewedId)
        else:
            return Junct_Rev_Deck.objects.all()


class Junct_Rev_GroupdeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rev_Groupdeck_Serializer
    # queryset = Junct_Rev_Groupdeck.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("mode") == "personal":
            reviewerId = self.request.query_params.get("reviewerId")
            reviewedId = self.request.query_params.get("reviewedId")
            print("reviewer: ", reviewerId, " content", reviewedId)
            return Junct_Rev_Groupdeck.objects.filter(reviewingUser_Groupdeck__id=reviewerId
                                                      ).filter(reviewedGroupdeck__id=reviewedId)
        else:
            return Junct_Rev_Groupdeck.objects.all()


class Junct_Rev_NoteViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Rev_Note_Serializer
    # queryset = Junct_Rev_Note.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("mode") == "personal":
            reviewerId = self.request.query_params.get("reviewerId")
            reviewedId = self.request.query_params.get("reviewedId")
            return Junct_Rev_Note.objects.filter(reviewingUser_Note__id=reviewerId
                                                 ).filter(reviewedNote__id=reviewedId)
        else:
            return Junct_Rev_Note.objects.all()


#           --------
#             SNDS
#           --------


class Junct_Snd_NoteViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Snd_Note_Serializer
    queryset = Junct_Snd_Note.objects.all()


#           --------
#             SUBS
#           --------


class Junct_Sub_DeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Sub_Deck_Serializer
    queryset = Junct_Sub_Deck.objects.all()


class Junct_Sub_FormatViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Sub_Format_Serializer
    queryset = Junct_Sub_Format.objects.all()


class Junct_Sub_GroupdeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Sub_Groupdeck_Serializer
    queryset = Junct_Sub_Groupdeck.objects.all()


class Junct_Sub_NoteViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_Sub_Note_Serializer
    queryset = Junct_Sub_Note.objects.all()


#           --------
#             TAGS
#           --------


class Junct_PhylumTag_CcpickViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_PhylumTag_Ccpick_Serializer
    queryset = Junct_PhylumTag_Ccpick.objects.all()


class Junct_PhylumTag_DeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_PhylumTag_Deck_Serializer
    queryset = Junct_PhylumTag_Deck.objects.all()


class Junct_PhylumTag_FormatViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_PhylumTag_Format_Serializer
    queryset = Junct_PhylumTag_Format.objects.all()


class Junct_PhylumTag_GroupdeckViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_PhylumTag_Groupdeck_Serializer
    queryset = Junct_PhylumTag_Groupdeck.objects.all()


class Junct_PhylumTag_NoteViewSet(viewsets.ModelViewSet):
    serializer_class = Junct_PhylumTag_Note_Serializer
    queryset = Junct_PhylumTag_Note.objects.all()
