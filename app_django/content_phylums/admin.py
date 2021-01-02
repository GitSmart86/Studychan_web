from django.contrib import admin

from .models._ccpick import Ccpick
from .models._deck import Deck
from .models._format import Format
from .models._groupdeck import Groupdeck
from .models._note import Note
from .models._phylum_tag import Phylum_Tag

from .models.junct_img_ccpick import Junct_Img_Ccpick
from .models.junct_img_note import Junct_Img_Note

from .models.junct_rate_ccpick import Junct_Rate_Ccpick
from .models.junct_rate_deck import Junct_Rate_Deck
from .models.junct_rate_format import Junct_Rate_Format
from .models.junct_rate_groupdeck import Junct_Rate_Groupdeck
from .models.junct_rate_note import Junct_Rate_Note

from .models.junct_rev_deck import Junct_Rev_Deck
from .models.junct_rev_groupdeck import Junct_Rev_Groupdeck
from .models.junct_rev_note import Junct_Rev_Note

from .models.junct_snd_note import Junct_Snd_Note

from .models.junct_sub_deck import Junct_Sub_Deck
from .models.junct_sub_format import Junct_Sub_Format
from .models.junct_sub_groupdeck import Junct_Sub_Groupdeck
from .models.junct_sub_note import Junct_Sub_Note

from .models.junct_tag_ccpick import Junct_PhylumTag_Ccpick
from .models.junct_tag_deck import Junct_PhylumTag_Deck
from .models.junct_tag_format import Junct_PhylumTag_Format
from .models.junct_tag_groupdeck import Junct_PhylumTag_Groupdeck
from .models.junct_tag_note import Junct_PhylumTag_Note


# -------
#   Img
# -------


class Junct_Img_CcpickInline(admin.TabularInline):
    model = Junct_Img_Ccpick
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Img_Ccpick)


class Junct_Img_NoteInline(admin.TabularInline):
    model = Junct_Img_Note
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Img_Note)


# ---------
#   RATES
# ---------


class Junct_Rate_CcpickInline(admin.TabularInline):
    model = Junct_Rate_Ccpick
    extra = 1
    fk_name = "ratedCcpick"
    search_fields = ['ratedCcpick']


admin.site.register(Junct_Rate_Ccpick)


class Junct_Rate_DeckInline(admin.TabularInline):
    model = Junct_Rate_Deck
    extra = 1
    fk_name = "ratedDeck"
    search_fields = ['ratedDeck']


admin.site.register(Junct_Rate_Deck)


class Junct_Rate_FormatInline(admin.TabularInline):
    model = Junct_Rate_Format
    extra = 1
    fk_name = "ratedFormat"
    search_fields = ['ratedFormat']


admin.site.register(Junct_Rate_Format)


class Junct_Rate_GroupdeckInline(admin.TabularInline):
    model = Junct_Rate_Groupdeck
    extra = 1
    fk_name = "ratedGroupdeck"
    search_fields = ['ratedGroupdeck']


admin.site.register(Junct_Rate_Groupdeck)


class Junct_Rate_NoteInline(admin.TabularInline):
    model = Junct_Rate_Note
    extra = 1
    fk_name = "ratedNote"
    search_fields = ['ratedNote']


admin.site.register(Junct_Rate_Note)


# --------
#   REVS
# --------


class Junct_Rev_DeckInline(admin.TabularInline):
    model = Junct_Rev_Deck
    extra = 1
    fk_name = "reviewedDeck"
    search_fields = ['reviewedDeck']


admin.site.register(Junct_Rev_Deck)


class Junct_Rev_GroupdeckInline(admin.TabularInline):
    model = Junct_Rev_Groupdeck
    extra = 1
    fk_name = "reviewedGroupdeck"
    search_fields = ['reviewedGroupdeck']


admin.site.register(Junct_Rev_Groupdeck)


class Junct_Rev_NoteInline(admin.TabularInline):
    model = Junct_Rev_Note
    extra = 1
    fk_name = "reviewedNote"
    search_fields = ['reviewedNote']


admin.site.register(Junct_Rev_Note)


# -------
#   SND
# -------


class Junct_Snd_NoteInline(admin.TabularInline):
    model = Junct_Snd_Note
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Snd_Note)


# --------
#   SUBS
# --------


class Junct_Sub_DeckInline(admin.TabularInline):
    model = Junct_Sub_Deck
    extra = 1
    fk_name = "subbedDeck"
    search_fields = ['subbedDeck']


admin.site.register(Junct_Sub_Deck)


class Junct_Sub_FormatInline(admin.TabularInline):
    model = Junct_Sub_Format
    extra = 1
    fk_name = "subbedFormat"
    search_fields = ['subbedFormat']


admin.site.register(Junct_Sub_Format)


class Junct_Sub_GroupdeckInline(admin.TabularInline):
    model = Junct_Sub_Groupdeck
    extra = 1
    fk_name = "subbedGroupdeck"
    search_fields = ['subbedGroupdeck']


admin.site.register(Junct_Sub_Groupdeck)


class Junct_Sub_NoteInline(admin.TabularInline):
    model = Junct_Sub_Note
    extra = 1
    fk_name = "subbedNote"
    search_fields = ['subbedNote']


admin.site.register(Junct_Sub_Note)


# ---------
#   TAGS
# ---------

admin.site.register([Phylum_Tag])


class Junct_Tag_CcpickInline(admin.TabularInline):
    model = Junct_PhylumTag_Ccpick
    extra = 1
    fk_name = "tagged_ccpick"
    search_fields = ['tagged_ccpick']


admin.site.register(Junct_PhylumTag_Ccpick)


class Junct_Tag_DeckInline(admin.TabularInline):
    model = Junct_PhylumTag_Deck
    extra = 1
    fk_name = "tagged_deck"
    search_fields = ['tagged_deck']


admin.site.register(Junct_PhylumTag_Deck)


class Junct_Tag_FormatInline(admin.TabularInline):
    model = Junct_PhylumTag_Format
    extra = 1
    fk_name = "tagged_format"
    search_fields = ['tagged_format']


admin.site.register(Junct_PhylumTag_Format)


class Junct_Tag_GroupdeckInline(admin.TabularInline):
    model = Junct_PhylumTag_Groupdeck
    extra = 1
    fk_name = "tagged_groupdeck"
    search_fields = ['tagged_groupdeck']


admin.site.register(Junct_PhylumTag_Groupdeck)


class Junct_Tag_NoteInline(admin.TabularInline):
    model = Junct_PhylumTag_Note
    extra = 1
    fk_name = "tagged_note"
    search_fields = ['tagged_note']


admin.site.register(Junct_PhylumTag_Note)


# -----------
#   PHYLUM
# -----------


@admin.register(Ccpick)
class CcpickAdmin(admin.ModelAdmin):
    inlines = [Junct_Tag_CcpickInline,
               Junct_Rate_CcpickInline,
               Junct_Img_CcpickInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    inlines = [Junct_Tag_DeckInline,
               Junct_Sub_DeckInline,
               Junct_Rev_DeckInline,
               Junct_Rate_DeckInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Format)
class FormatAdmin(admin.ModelAdmin):
    inlines = [Junct_Tag_FormatInline,
               Junct_Sub_FormatInline,
               Junct_Rate_FormatInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Groupdeck)
class GroupdeckAdmin(admin.ModelAdmin):
    inlines = [Junct_Tag_GroupdeckInline,
               Junct_Sub_GroupdeckInline,
               Junct_Rev_GroupdeckInline,
               Junct_Rate_GroupdeckInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    inlines = [Junct_Tag_NoteInline,
               Junct_Sub_NoteInline,
               Junct_Snd_NoteInline,
               Junct_Rev_NoteInline,
               Junct_Rate_NoteInline,
               Junct_Img_NoteInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]
