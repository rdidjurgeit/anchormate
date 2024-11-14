from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AnchorageViewSet, BookmarkListView, BookmarkDetailView

router = DefaultRouter()
router.register(r'', AnchorageViewSet)
# router.register(r'bookmarks', BookmarkListView)

urlpatterns = [
    path('bookmarks/', BookmarkListView.as_view(), name='bookmark-list'),
    path('bookmarks/<int:pk>/', BookmarkDetailView.as_view(), name='bookmark-detail'),
]

urlpatterns += router.urls
