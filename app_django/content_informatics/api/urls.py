from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *
router = DefaultRouter()


# ----------
#   CUSTOM
# ----------

urlpatterns = [
    path('store_search/', StoreSearch.as_view()),
]

# ---------------
#   INFORMATICS
# ---------------

router.register('addon',
                AddonViewSet,
                basename='addon')

router.register('deed',
                DeedViewSet,
                basename='deed')

router.register('feedback_response',
                Feedback_ResponseViewSet,
                basename='feedback_response')

router.register('feedback',
                FeedbackViewSet,
                basename='feedback')

router.register('informatics_tag',
                Informatics_TagViewSet,
                basename='informatics_tag')

router.register('news',
                NewsViewSet,
                basename='news')

router.register('theme',
                ThemeViewSet,
                basename='theme')

# ---------
#   JUNCT
# ---------

#           --------
#             IMGS
#           --------

router.register('img_addon',
                Junct_Img_AddonViewSet,
                basename='img_addon')

router.register('img_feedback',
                Junct_Img_FeedbackViewSet,
                basename='img_feedback')

router.register('img_news',
                Junct_Img_NewsViewSet,
                basename='img_news')

router.register('img_theme',
                Junct_Img_ThemeViewSet,
                basename='img_theme')

#           --------
#             SUBS
#           --------

router.register('sub_addon',
                Junct_Sub_AddonViewSet,
                basename='sub_addon')

router.register('sub_theme',
                Junct_Sub_ThemeViewSet,
                basename='sub_theme')

#           --------
#             TAGS
#           --------

router.register('informatics_tag_addon',
                Junct_InformaticsTag_AddonViewSet,
                basename='informatics_tag_addon')

router.register('informatics_tag_news',
                Junct_InformaticsTag_NewsViewSet,
                basename='informatics_tag_news')

router.register('informatics_tag_theme',
                Junct_InformaticsTag_ThemeViewSet,
                basename='informatics_tag_theme')

#           ---------
#             DEEDS
#           ---------

router.register('deed_user',
                Junct_User_DeedViewSet,
                basename='deed_user')

# --------
#   JOIN
# --------

urlpatterns += router.urls
