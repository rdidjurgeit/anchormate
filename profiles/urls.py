from django.urls import path
from .views import UserProfileView, RegisterView

urlpatterns = [
    path('', UserProfileView.as_view(), name='user-profile'),
    path('register/', RegisterView.as_view(), name='register'),
]