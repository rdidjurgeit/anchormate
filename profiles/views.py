from django.contrib.auth.models import User
from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer, UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user.profile

    # def get_queryset(self):
    #     # Allow each user to only access their profile
    #     return UserProfile.objects.filter(user=self.request.user)
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] 