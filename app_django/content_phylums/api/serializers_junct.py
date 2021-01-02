from rest_framework import serializers

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
from ..models.junct_sub_format import Junct_Sub_Format
from ..models.junct_sub_groupdeck import Junct_Sub_Groupdeck
from ..models.junct_sub_note import Junct_Sub_Note

from ..models.junct_tag_ccpick import Junct_PhylumTag_Ccpick
from ..models.junct_tag_deck import Junct_PhylumTag_Deck
from ..models.junct_tag_format import Junct_PhylumTag_Format
from ..models.junct_tag_groupdeck import Junct_PhylumTag_Groupdeck
from ..models.junct_tag_note import Junct_PhylumTag_Note


# ---------
#   IMGS
# ---------


class Junct_Img_Ccpick_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Img_Ccpick
        fields = ('__all__')


class Junct_Img_Note_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Img_Note
        fields = ('__all__')


# ---------
#   RATES
# ---------


class Junct_Rate_Ccpick_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Rate_Ccpick
        fields = ('__all__')


class Junct_Rate_Deck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Rate_Deck
        fields = ('__all__')


class Junct_Rate_Format_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Rate_Format
        fields = ('__all__')


class Junct_Rate_Groupdeck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Rate_Groupdeck
        fields = ('__all__')


class Junct_Rate_Note_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Rate_Note
        fields = ('__all__')


# ---------
#   REVS
# ---------


class Junct_Rev_Deck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    reviewingUser_Deck = serializers.ReadOnlyField
    reviewedDeck = serializers.ReadOnlyField

    class Meta:
        model = Junct_Rev_Deck
        fields = ('__all__')


class Junct_Rev_Groupdeck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    reviewingUser_Groupdeck = serializers.ReadOnlyField
    reviewedGroupdeck = serializers.ReadOnlyField

    class Meta:
        model = Junct_Rev_Groupdeck
        fields = ('__all__')


class Junct_Rev_Note_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    reviewingUser_Note = serializers.ReadOnlyField
    reviewedNote = serializers.ReadOnlyField

    class Meta:
        model = Junct_Rev_Note
        fields = ('__all__')


# ---------
#   SNDS
# ---------


class Junct_Snd_Note_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Snd_Note
        fields = ('__all__')


# ---------
#   SUBS
# ---------


class Junct_Sub_Deck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Sub_Deck
        fields = ('__all__')


class Junct_Sub_Groupdeck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Sub_Groupdeck
        fields = ('__all__')


class Junct_Sub_Format_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Sub_Format
        fields = ('__all__')


class Junct_Sub_Note_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_Sub_Note
        fields = ('__all__')


# ---------
#   TAGS
# ---------


class Junct_PhylumTag_Ccpick_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_PhylumTag_Ccpick
        fields = ('__all__')


class Junct_PhylumTag_Deck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_PhylumTag_Deck
        fields = ('__all__')


class Junct_PhylumTag_Format_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_PhylumTag_Format
        fields = ('__all__')


class Junct_PhylumTag_Groupdeck_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_PhylumTag_Groupdeck
        fields = ('__all__')


class Junct_PhylumTag_Note_Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Junct_PhylumTag_Note
        fields = ('__all__')
