from rest_framework import serializers

from ..models._ccpick import Ccpick
from ..models._deck import Deck
from ..models._format import Format
from ..models._groupdeck import Groupdeck
from ..models._note import Note
from ..models._phylum_tag import Phylum_Tag
# from ..models._junct_sub_deck import Junct_Sub_Deck
# from ..models._junct_sub_groupdeck import Junct_Sub_Groupdeck
# from ..models._junct_sub_note import Junct_Sub_Note
# from ..models._junct_sub_format import Junct_Sub_Format

from .serializers_custom import Format_Type_SerializerField, User_Owner_SerializerField

from .serializers_junct import *

# subscribers_cnt = serializers.SerializerMethodField()
# your_subscriptions_cnt = serializers.SerializerMethodField()
# posRatings_cnt = serializers.SerializerMethodField()
# your_posRatings_cnt = serializers.SerializerMethodField()

# class Meta:
#     model = UserDjEx
#     fields = ('id', 'username', 'email', 'date_joined', 'last_login',
#               'description', 'icon', 'subscribers_cnt', 'your_subscriptions_cnt',
#               'posRatings_cnt', 'your_posRatings_cnt',)  # 'subscribers', 'posRatings', 'phylum_tags',
#     # fields = ('__all__')

# def get_subscribers_cnt(self, obj):
#     return obj.subscribers.count()

# def get_posRatings_cnt(self, obj):
#     return obj.posRatings.count()

# def get_your_subscriptions_cnt(self, obj):
#     return obj.your_subscriptions.count()

# def get_your_posRatings_cnt(self, obj):
#     return obj.your_posRatings.count()


class PhylumTagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Phylum_Tag
        fields = ('__all__')


class CcpickSerializer(serializers.ModelSerializer):

    # owner = serializers.SerializerMethodField(read_only=True)
    owner = User_Owner_SerializerField()
    owner_name = serializers.SerializerMethodField()
    posRating_cnt = serializers.SerializerMethodField()
    negRating_cnt = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    ccpick_img = Junct_Img_Ccpick_Serializer(
        many=True,
        required=False,)
    u_liked = serializers.SerializerMethodField()

    class Meta:
        model = Ccpick
        fields = ('id',
                  'owner',
                  'owner_name',
                  'name',
                  'description',
                  'timestamp_updated',
                  'isPublished',
                  'ccpick_img',
                  'icon',
                  'posRating_cnt',
                  'negRating_cnt',
                  'tags',
                  'u_liked',
                  )

    def get_owner(self, obj):
        return obj.owner.id

    def get_owner_name(self, obj):
        return obj.owner.username

    def get_posRating_cnt(self, obj):
        return Junct_Rate_Ccpick.objects.filter(ratedCcpick=obj).filter(posRating=True).count()

    def get_negRating_cnt(self, obj):
        return Junct_Rate_Ccpick.objects.filter(ratedCcpick=obj).filter(posRating=False).count()

    def get_tags(self, obj):
        junct_tag = Junct_PhylumTag_Ccpick.objects.filter(tagged_ccpick=obj)
        tags = []

        for junct in junct_tag:
            tag_serialized = PhylumTagSerializer(junct.ccpick_phylum_tag)
            tags.append(tag_serialized.data)
        return tags


    def get_u_liked(self, obj):        
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                rate = Junct_Rate_Ccpick.objects.filter(
                        ratingUser_Ccpick=request.user.id).filter(
                            ratedCcpick=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        
        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                rate = Junct_Rate_Ccpick.objects.filter(
                        ratingUser_Ccpick=request).filter(
                            ratedCcpick=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        return 0



class DeckSerializer(serializers.ModelSerializer):

    format_type = Format_Type_SerializerField()
    # owner = serializers.SerializerMethodField(read_only=True)
    owner = User_Owner_SerializerField()
    owner_name = serializers.SerializerMethodField()
    posRating_cnt = serializers.SerializerMethodField()
    negRating_cnt = serializers.SerializerMethodField()
    sub_cnt = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    u_subbed = serializers.SerializerMethodField()
    u_liked = serializers.SerializerMethodField()

    class Meta:
        model = Deck
        fields = ('id',
                  'owner',
                  'owner_name',
                  'format_type',
                  'name',
                  'description',
                  'timestamp_updated',
                  'timestamp',
                  'isPublished',
                  'icon',
                  'tags',
                  'posRating_cnt',
                  'negRating_cnt',
                  'sub_cnt',
                  'u_subbed',
                  'u_liked',
                  )

    def get_owner(self, obj):
        return obj.owner.id

    def get_owner_name(self, obj):
        return obj.owner.username

    def get_posRating_cnt(self, obj):
        return Junct_Rate_Deck.objects.filter(ratedDeck=obj).filter(posRating=True).count()

    def get_negRating_cnt(self, obj):
        return Junct_Rate_Deck.objects.filter(ratedDeck=obj).filter(posRating=False).count()

    def get_sub_cnt(self, obj):
        return Junct_Sub_Deck.objects.filter(subbedDeck=obj).count()

    def get_tags(self, obj):
        junct_tag = Junct_PhylumTag_Deck.objects.filter(tagged_deck=obj)
        tags = []

        for junct in junct_tag:
            tag_serialized = PhylumTagSerializer(junct.deck_phylum_tag)
            tags.append(tag_serialized.data)
        return tags

    def get_u_subbed(self, obj):       
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                sub = Junct_Sub_Deck.objects.filter(
                        subbingUser_Deck=request.user.id).filter(
                            subbedDeck=obj.id).first()
                if (sub is not None):
                    return 1
        
        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                rate = Junct_Rate_Deck.objects.filter(
                        ratingUser_Deck=request).filter(
                            ratedDeck=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        return 0


    def get_u_liked(self, obj):        
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                rate = Junct_Rate_Deck.objects.filter(
                        ratingUser_Deck=request.user.id).filter(
                            ratedDeck=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        
        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                rate = Junct_Rate_Deck.objects.filter(
                        ratingUser_Deck=request).filter(
                            ratedDeck=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        return 0


class FormatSerializer(serializers.ModelSerializer):

    # owner = serializers.SerializerMethodField(read_only=True)
    owner = User_Owner_SerializerField()
    owner_name = serializers.SerializerMethodField()
    posRating_cnt = serializers.SerializerMethodField()
    negRating_cnt = serializers.SerializerMethodField()
    sub_cnt = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    u_subbed = serializers.SerializerMethodField()
    u_liked = serializers.SerializerMethodField()

    class Meta:
        model = Format
        fields = ('id',
                  'owner',
                  'owner_name',
                  'name',
                  'description',
                  'timestamp_updated',
                  'timestamp',
                  'isPublished',
                  'icon',
                  'content_type',
                  'tags',
                  'posRating_cnt',
                  'negRating_cnt',
                  'sub_cnt',
                  'u_subbed',
                  'u_liked',
                  )

    def get_owner(self, obj):
        return obj.owner.id

    def get_owner_name(self, obj):
        return obj.owner.username

    def get_posRating_cnt(self, obj):
        return Junct_Rate_Format.objects.filter(ratedFormat=obj).filter(posRating=True).count()

    def get_negRating_cnt(self, obj):
        return Junct_Rate_Format.objects.filter(ratedFormat=obj).filter(posRating=False).count()

    def get_sub_cnt(self, obj):
        return Junct_Sub_Format.objects.filter(subbedFormat=obj).count()

    def get_tags(self, obj):
        junct_tag = Junct_PhylumTag_Format.objects.filter(tagged_format=obj)
        tags = []

        for junct in junct_tag:
            tag_serialized = PhylumTagSerializer(junct.format_phylum_tag)
            tags.append(tag_serialized.data)
        return tags

    def get_u_subbed(self, obj):       
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                sub = Junct_Sub_Format.objects.filter(
                        subbingUser_Format=request.user.id).filter(
                            subbedFormat=obj.id).first()
                if (sub is not None):
                    return 1
        
        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                sub = Junct_Sub_Format.objects.filter(
                        subbingUser_Format=request).filter(
                            subbedFormat=obj.id).first()
                if (sub is not None):
                    return 1
        return 0


    def get_u_liked(self, obj):        
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                rate = Junct_Rate_Format.objects.filter(
                        ratingUser_Format=request.user.id).filter(
                            ratedFormat=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        
        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                rate = Junct_Rate_Format.objects.filter(
                        ratingUser_Format=request).filter(
                            ratedFormat=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        return 0



class GroupDeckSerializer(serializers.ModelSerializer):

    format_type = Format_Type_SerializerField()
    owner = User_Owner_SerializerField()
    # owner = serializers.SerializerMethodField()
    owner_name = serializers.SerializerMethodField()
    posRating_cnt = serializers.SerializerMethodField()
    negRating_cnt = serializers.SerializerMethodField()
    sub_cnt = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    u_subbed = serializers.SerializerMethodField()
    u_liked = serializers.SerializerMethodField()

    class Meta:
        model = Groupdeck
        fields = ('id',
                  'owner',
                  'owner_name',
                  'format_type',
                  'name',
                  'description',
                  'timestamp_updated',
                  'timestamp',
                  'isPublished',
                  'icon',
                  'tags',
                  'posRating_cnt',
                  'negRating_cnt',
                  'sub_cnt',
                  'u_subbed',
                  'u_liked',
                  )

    def get_owner(self, obj):
        return obj.owner.id

    def get_owner_name(self, obj):
        return obj.owner.username

    def get_posRating_cnt(self, obj):
        return Junct_Rate_Groupdeck.objects.filter(ratedGroupdeck=obj).filter(posRating=True).count()

    def get_negRating_cnt(self, obj):
        return Junct_Rate_Groupdeck.objects.filter(ratedGroupdeck=obj).filter(posRating=False).count()

    def get_sub_cnt(self, obj):
        return Junct_Sub_Groupdeck.objects.filter(subbedGroupdeck=obj).count()

    def get_tags(self, obj):
        junct_tag = Junct_PhylumTag_Groupdeck.objects.filter(
            tagged_groupdeck=obj)
        tags = []

        for junct in junct_tag:
            tag_serialized = PhylumTagSerializer(junct.groupdeck_phylum_tag)
            tags.append(tag_serialized.data)
        return tags

    def get_u_subbed(self, obj):       
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                sub = Junct_Sub_Groupdeck.objects.filter(
                        subbingUser_Groupdeck=request.user.id).filter(
                            subbedGroupdeck=obj.id).first()
                if (sub is not None):
                    return 1
        
        request = self.context.get("request.user.id")   
        if (request): 
            if (request != None):
                sub = Junct_Sub_Groupdeck.objects.filter(
                        subbingUser_Groupdeck=request).filter(
                            subbedGroupdeck=obj.id).first()
                if (sub is not None):
                    return 1
        return 0


    def get_u_liked(self, obj):        
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                rate = Junct_Rate_Groupdeck.objects.filter(
                        ratingUser_Groupdeck=request.user.id).filter(
                            ratedGroupdeck=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        
        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                rate = Junct_Rate_Groupdeck.objects.filter(
                        ratingUser_Groupdeck=request).filter(
                            ratedGroupdeck=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        return 0



class NoteSerializer(serializers.ModelSerializer):

    # owner = serializers.SerializerMethodField(read_only=True)
    owner = User_Owner_SerializerField()
    format_type = Format_Type_SerializerField()
    # owner = serializers.SerializerMethodField()
    owner_name = serializers.SerializerMethodField()

    posRating_cnt = serializers.SerializerMethodField(read_only=True)
    negRating_cnt = serializers.SerializerMethodField(read_only=True)
    sub_cnt = serializers.SerializerMethodField(read_only=True)
    tags = serializers.SerializerMethodField()
    note_img = Junct_Img_Note_Serializer(
        many=True,
        required=False,
        # read_only=True
    )
    note_snd = Junct_Snd_Note_Serializer(
        many=True,
        required=False,
        # read_only=True
    )
    u_subbed = serializers.SerializerMethodField()
    u_liked = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = ('id',
                  'owner',
                  'owner_name',
                  'format_type',
                  'name',
                  'description',
                  'note_contents',
                  'timestamp_updated',
                  'timestamp',
                  'isPublished',
                  'icon',
                  'tags',
                  'posRating_cnt',
                  'negRating_cnt',
                  'sub_cnt',
                  'note_img',
                  'note_snd',
                  'u_subbed',
                  'u_liked',
                  )

    def get_owner(self, obj):
        return obj.owner.id

    def get_owner_name(self, obj):
        return obj.owner.username

    def get_posRating_cnt(self, obj):
        return Junct_Rate_Note.objects.filter(ratedNote=obj).filter(posRating=True).count()

    def get_negRating_cnt(self, obj):
        return Junct_Rate_Note.objects.filter(ratedNote=obj).filter(posRating=False).count()

    def get_sub_cnt(self, obj):
        return Junct_Sub_Note.objects.filter(subbedNote=obj).count()

    def get_tags(self, obj):
        junct_tag = Junct_PhylumTag_Note.objects.filter(tagged_note=obj)
        tags = []

        for junct in junct_tag:
            tag_serialized = PhylumTagSerializer(junct.note_phylum_tag)
            tags.append(tag_serialized.data)
        return tags

    def get_u_subbed(self, obj):       
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                sub = Junct_Sub_Note.objects.filter(
                        subbingUser_Note=request.user.id).filter(
                            subbedNote=obj.id).first()
                if (sub is not None):
                    return 1
                else:
                    return 0

        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                sub = Junct_Sub_Note.objects.filter(
                        subbingUser_Note=request).filter(
                            subbedNote=obj.id).first()
                if (sub is not None):
                    return 1
        return 0

    def get_u_liked(self, obj):        
        request = self.context.get("request")
        if (request): 
            if (request.user.id != None):
                rate = Junct_Rate_Note.objects.filter(
                        ratingUser_Note=request.user.id).filter(
                            ratedNote=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
            else:
                return 0 

        request = self.context.get("request.user.id")
        if (request): 
            if (request != None):
                rate = Junct_Rate_Note.objects.filter(
                        ratingUser_Note=request).filter(
                            ratedNote=obj.id).first()
                if (rate is not None):
                    if (rate.posRating):
                        return 1
                    else:
                        return -1
        return 0
              


# class NoteReadSerializer(NoteSerializer):
#     # note_img = Junct_Img_Note_Serializer(many=True, required=False)
#     # note_snd = Junct_Snd_Note_Serializer(many=True, required=False)
#     pass
