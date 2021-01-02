from django.urls import path
from rest_framework.routers import DefaultRouter
from .views._deck import DeckViewSet
from .views._groupdeck import GroupDeckViewSet
from .views._format import FormatViewSet

router = DefaultRouter()
router.register(r'deck', DeckViewSet, basename='deck')
router.register(r'groupdeck', GroupDeckViewSet, basename='groupdeck')
router.register(r'format', FormatViewSet, basename='formatdeck')
urlpatterns = router.urls


# from django.urls import path

# from .views._deck import (
#     DeckListView,
#     DeckDetailView,
#     DeckCreateView,
#     DeckUpdateView,
#     DeckDeleteView
# )

# from .views._groupdeck import (
#     GroupDeckListView,
#     GroupDeckDetailView,
#     GroupDeckCreateView,
#     GroupDeckUpdateView,
#     GroupDeckDeleteView
# )

# from .views._format import (
#     FormatListView,
#     FormatDetailView,
#     FormatCreateView,
#     FormatUpdateView,
#     FormatDeleteView
# )

# urlpatterns = [
#     path('deck/', DeckListView.as_view()),
#     path('deck/create/', DeckCreateView.as_view()),
#     path('deck/<pk>', DeckDetailView.as_view()),
#     path('deck/<pk>/update/', DeckUpdateView.as_view()),
#     path('deck/<pk>/delete/', DeckDeleteView.as_view()),

#     path('groupdeck/', GroupDeckListView.as_view()),
#     path('groupdeck/create/', GroupDeckCreateView.as_view()),
#     path('groupdeck/<pk>', GroupDeckDetailView.as_view()),
#     path('groupdeck/<pk>/update/', GroupDeckUpdateView.as_view()),
#     path('groupdeck/<pk>/delete/', GroupDeckDeleteView.as_view()),

#     path('format/', FormatListView.as_view()),
#     path('format/create/', FormatCreateView.as_view()),
#     path('format/<pk>', FormatDetailView.as_view()),
#     path('format/<pk>/update/', FormatUpdateView.as_view()),
#     path('format/<pk>/delete/', FormatDeleteView.as_view())
# ]
