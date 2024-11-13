from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import AnchorageViewSet, UserBookmarkListView

router = DefaultRouter()
router.register(r'', AnchorageViewSet)
router.register(r'reviews', views.ChartReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/user/bookmarks/', UserBookmarkListView.as_view(), name='user-bookmarks'),
]