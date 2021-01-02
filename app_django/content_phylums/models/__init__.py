from django.db import models

from ._ccpick import Ccpick
from ._deck import Deck
from ._format import Format
from ._groupdeck import Groupdeck
from ._note import Note
from ._phylum_tag import Phylum_Tag

from .junct_img_ccpick import Junct_Img_Ccpick
from .junct_img_note import Junct_Img_Note

from .junct_rate_ccpick import Junct_Rate_Ccpick
from .junct_rate_deck import Junct_Rate_Deck
from .junct_rate_format import Junct_Rate_Format
from .junct_rate_groupdeck import Junct_Rate_Groupdeck
from .junct_rate_note import Junct_Rate_Note

from .junct_rev_deck import Junct_Rev_Deck
from .junct_rev_groupdeck import Junct_Rev_Groupdeck
from .junct_rev_note import Junct_Rev_Note

from .junct_snd_note import Junct_Snd_Note

from .junct_sub_deck import Junct_Sub_Deck
from .junct_sub_groupdeck import Junct_Sub_Groupdeck
from .junct_sub_note import Junct_Sub_Note
from .junct_sub_format import Junct_Sub_Format

from .junct_tag_ccpick import Junct_PhylumTag_Ccpick
from .junct_tag_deck import Junct_PhylumTag_Deck
from .junct_tag_format import Junct_PhylumTag_Format
from .junct_tag_groupdeck import Junct_PhylumTag_Groupdeck
from .junct_tag_note import Junct_PhylumTag_Note
