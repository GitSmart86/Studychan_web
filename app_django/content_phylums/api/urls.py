from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *
router = DefaultRouter()


# ----------
#   CUSTOM
# ----------

urlpatterns = [
    path('database_search/', DatabaseSearch.as_view()),
    path('user_database_search/', UserDatabaseSearch.as_view()),
    path('rev_database_search/', RevDatabaseSearch.as_view()),
    path('rate_database_search/', RateDatabaseSearch.as_view()),
    path('sub_database_search/', SubDatabaseSearch.as_view()),
    path('<str:phylum>/<int:id>/subscribe', Viewer_Subscribe.as_view()),
    path('<str:phylum>/<int:id>/rate/<str:rateType>', Viewer_Rate.as_view()),
]

# ----------
#   PHYLUM
# ----------

router.register('phylum_tag',
                PhylumTagViewSet,
                basename='phylum_tag')

router.register('ccpick',
                CcpickViewSet,
                basename='ccpick')

router.register('deck',
                DeckViewSet,
                basename='deck')

router.register('format',
                FormatViewSet,
                basename='format')

router.register('groupdeck',
                GroupDeckViewSet,
                basename='groupdeck')

router.register('note',
                NoteViewSet,
                basename='note')

# ---------
#   JUNCT
# ---------

#           --------
#             IMGS
#           --------

router.register('img_ccpick',
                Junct_Img_CcpickViewSet,
                basename='img_ccpick')

router.register('img_note',
                Junct_Img_NoteViewSet,
                basename='img_note')

#           ---------
#             RATES
#           ---------

router.register('rate_ccpick',
                Junct_Rate_CcpickViewSet,
                basename='rate_ccpick')

router.register('rate_deck',
                Junct_Rate_DeckViewSet,
                basename='rate_deck')

router.register('rate_format',
                Junct_Rate_FormatViewSet,
                basename='rate_format')

router.register('rate_groupdeck',
                Junct_Rate_GroupdeckViewSet,
                basename='rate_groupdeck')

router.register('rate_note',
                Junct_Rate_NoteViewSet,
                basename='rate_note')

#           --------
#             REVS
#           --------

router.register('rev_deck',
                Junct_Rev_DeckViewSet,
                basename='rev_deck')

router.register('rev_groupdeck',
                Junct_Rev_GroupdeckViewSet,
                basename='rev_groupdeck')

router.register('rev_note',
                Junct_Rev_NoteViewSet,
                basename='rev_note')

#           --------
#             SNDS
#           --------

router.register('snd_note',
                Junct_Snd_NoteViewSet,
                basename='snd_note')

#           --------
#             SUBS
#           --------

router.register('sub_deck',
                Junct_Sub_DeckViewSet,
                basename='sub_deck')

router.register('sub_format',
                Junct_Sub_GroupdeckViewSet,
                basename='sub_format')

router.register('sub_groupdeck',
                Junct_Sub_GroupdeckViewSet,
                basename='sub_groupdeck')

router.register('sub_note',
                Junct_Sub_NoteViewSet,
                basename='sub_note')

#           --------
#             TAGS
#           --------

router.register('phylumtag_ccpick',
                Junct_PhylumTag_CcpickViewSet,
                basename='phylumtag_ccpick')

router.register('phylumtag_deck',
                Junct_PhylumTag_DeckViewSet,
                basename='phylumtag_deck')

router.register('phylumtag_format',
                Junct_PhylumTag_FormatViewSet,
                basename='phylumtag_format')

router.register('phylumtag_groupdeck',
                Junct_PhylumTag_GroupdeckViewSet,
                basename='phylumtag_groupdeck')

router.register('phylumtag_note',
                Junct_PhylumTag_NoteViewSet,
                basename='phylumtag_note')

# --------
#   JOIN
# --------

urlpatterns += router.urls
