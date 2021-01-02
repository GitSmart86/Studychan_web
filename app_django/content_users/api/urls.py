from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *
router = DefaultRouter()


# ----------
#   CUSTOM
# ----------

urlpatterns = [
    path('obtainauthuserdata/', ObtainAuthUserData.as_view()),
    path('obtainuserdata/', ObtainUserData.as_view()),
]

# --------
#   USER
# --------

router.register('userdj',
                UserDjExViewSet,
                basename='userdj')

router.register('userapk',
                UserWebViewSet,
                basename='userapk')

router.register('userexe',
                UserWebViewSet,
                basename='userexe')

router.register('userweb',
                UserWebViewSet,
                basename='userweb')

router.register('userstat',
                UserWebViewSet,
                basename='userstat')

# ---------
#   JUNCT
# ---------

router.register('userjunctratings',
                Junct_RatingsViewSet,
                basename='userjunctratings')

router.register('userjunctsubs',
                Junct_SubsViewSet,
                basename='userjunctsubs')

router.register('userjuncttags',
                Junct_TagsViewSet,
                basename='userjuncttags')

# --------
#   JOIN
# --------

urlpatterns += router.urls
