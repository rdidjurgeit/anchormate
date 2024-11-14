from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AnchorageViewSet, BookmarkListView, BookmarkDetailView

router = DefaultRouter()
router.register(r'anchorages', AnchorageViewSet)
router.register(r'bookmarks', BookmarkListView)

urlpatterns = []

urlpatterns += router.urls
