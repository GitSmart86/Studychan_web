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
    #   Phylum
    # ----------

    @staticmethod
    def Phylum(phylum):
        _dict = {
            "user": UserDjEx,
            "ccpick": Ccpick,
            "deck": Deck,
            "format": Format,
            "groupdeck": Groupdeck,
            "note": Note,
        }
        return _dict[phylum]

    @staticmethod
    def Phylum_Serializer(phylum):
        _dict = {
            "user": UserDjExSerializer,
            "ccpick": CcpickSerializer,
            "deck": DeckSerializer,
            "format": FormatSerializer,
            "groupdeck": GroupDeckSerializer,
            "note": NoteSerializer,
        }
        return _dict[phylum]

    # -------
    #   Sub
    # -------

    @staticmethod
    def Junct_Sub(phylum):
        _dict = {
            "user": Junct_Sub_User,
            "deck": Junct_Sub_Deck,
            "groupdeck": Junct_Sub_Groupdeck,
            "note": Junct_Sub_Note,
            "format": Junct_Sub_Format,
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Sub_Q_S(phylum, id):
        _dict = {
            "user": Q(subbingUser_User=id),
            "deck": Q(subbingUser_Deck=id),
            "groupdeck": Q(subbingUser_Groupdeck=id),
            "note": Q(subbingUser_Note=id),
            "format": Q(subbingUser_Format=id),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Sub_Q_DO(phylum, id):
        _dict = {
            "user": Q(subbedUser=id),
            "deck": Q(subbedDeck=id),
            "groupdeck": Q(subbedGroupdeck=id),
            "note": Q(subbedNote=id),
            "format": Q(subbedFormat=id),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Sub_Serializer(phylum):
        _dict = {
            "deck": Junct_Sub_Deck_Serializer,
            "groupdeck": Junct_Sub_Groupdeck_Serializer,
            "note": Junct_Sub_Note_Serializer,
            "format": Junct_Sub_Format_Serializer,
        }
        return _dict[phylum]

    # --------
    #   Rate
    # --------

    @staticmethod
    def Junct_Rate(phylum):
        _dict = {
            "user": Junct_Rate_User,
            "ccpick": Junct_Rate_Ccpick,
            "deck": Junct_Rate_Deck,
            "groupdeck": Junct_Rate_Groupdeck,
            "note": Junct_Rate_Note,
            "format": Junct_Rate_Format,
        }

        return _dict[phylum]

    @staticmethod
    def Junct_Rate_Q_S(phylum, id):
        _dict = {
            "user": Q(ratingUser_User=id),
            "ccpick": Q(ratingUser_Ccpick=id),
            "deck": Q(ratingUser_Deck=id),
            "groupdeck": Q(ratingUser_Groupdeck=id),
            "note": Q(ratingUser_Note=id),
            "format": Q(ratingUser_Format=id),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Rate_Q_DO(phylum, id):
        _dict = {
            "user": Q(ratedUser=id),
            "ccpick": Q(ratedCcpick=id),
            "deck": Q(ratedDeck=id),
            "groupdeck": Q(ratedGroupdeck=id),
            "note": Q(ratedNote=id),
            "format": Q(ratedFormat=id),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Rate_Serializer(phylum):
        _dict = {
            "user": Junct_Rate_User_Serializer,
            "ccpick": Junct_Rate_Ccpick_Serializer,
            "deck": Junct_Rate_Deck_Serializer,
            "groupdeck": Junct_Rate_Groupdeck_Serializer,
            "note": Junct_Rate_Note_Serializer,
            "format": Junct_Rate_Format_Serializer,
        }
        return _dict[phylum]

    # -------
    #   Rev
    # -------

    @staticmethod
    def Junct_Rev(phylum):
        _dict = {
            "deck": Junct_Rev_Deck,
            "groupdeck": Junct_Rev_Groupdeck,
            "note": Junct_Rev_Note,
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Rev_Q_S(phylum, id):
        _dict = {
            "deck": Q(reviewingUser_Deck=id),
            "groupdeck": Q(reviewingUser_Groupdeck=id),
            "note": Q(reviewingUser_Note=id),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Rev_Q_DO(phylum, id):
        _dict = {
            "deck": Q(reviewedDeck=id),
            "groupdeck": Q(reviewedGroupdeck=id),
            "note": Q(reviewedNote=id),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Rev_Serializer(phylum):
        _dict = {
            "deck": Junct_Rev_Deck_Serializer,
            "groupdeck": Junct_Rev_Groupdeck_Serializer,
            "note": Junct_Rev_Note_Serializer,
        }
        return _dict[phylum]

    # -------
    #   Tag
    # -------

    @staticmethod
    def Junct_Tag(phylum):
        _dict = {
            "user": Junct_PhylumTag_User,
            "ccpick": Junct_PhylumTag_Ccpick,
            "deck": Junct_PhylumTag_Deck,
            "groupdeck": Junct_PhylumTag_Groupdeck,
            "note": Junct_PhylumTag_Note,
            "format": Junct_PhylumTag_Format,
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Tag_Q_S(phylum, id):
        _dict = {
            "user": Q(tagged_user__id=id),
            "ccpick": Q(tagged_ccpick__id=id),
            "deck": Q(tagged_deck__id=id),
            "groupdeck": Q(tagged_groupdeck__id=id),
            "note": Q(tagged_note__id=id),
            "format": Q(tagged_format__id=id),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Tag_Q_DO(phylum, tagName):
        _dict = {
            "user": Q(user_phylum_tag__name=tagName),
            "ccpick": Q(ccpick_phylum_tag__name=tagName),
            "deck": Q(deck_phylum_tag__name=tagName),
            "groupdeck": Q(groupdeck_phylum_tag__name=tagName),
            "note": Q(note_phylum_tag__name=tagName),
            "format": Q(format_phylum_tag__name=tagName),
        }
        return _dict[phylum]

    @staticmethod
    def Junct_Tag_Serializer(phylum):
        _dict = {
            "user": Junct_Tag_User_Serializer,
            "ccpick": Junct_PhylumTag_Ccpick_Serializer,
            "deck": Junct_PhylumTag_Deck_Serializer,
            "groupdeck": Junct_PhylumTag_Groupdeck_Serializer,
            "note": Junct_PhylumTag_Note_Serializer,
            "format": Junct_PhylumTag_Format_Serializer,
        }
        return _dict[phylum]

    # -------
    #   Img
    # -------

    @staticmethod
    def Junct_Img(phylum):
        _dict = {
            "ccpick": Junct_Img_Ccpick,
            "note": Junct_Img_Note,
        }
        return _dict[phylum]

    # -------
    #   Snd
    # -------

    @staticmethod
    def Junct_Snd(phylum):
        _dict = {
            "note": Junct_Snd_Note,
        }
        return _dict[phylum]
