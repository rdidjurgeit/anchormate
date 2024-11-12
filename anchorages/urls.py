from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'anchorages', views.AnchorageViewSet)
router.register(r'reviews', views.ChartReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/register/', views.RegisterView.as_view(), name='register'),
]