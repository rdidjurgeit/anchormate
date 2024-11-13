from rest_framework import viewsets, generics, permissions
from django.contrib.auth.models import User
from .models import Anchorage, ChartReview, UserProfile
from .serializers import AnchorageSerializer, ChartReviewSerializer, UserRegistrationSerializer, UserProfileSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrEditOnly

class AnchorageViewSet(viewsets.ModelViewSet):
    queryset = Anchorage.objects.all()
    serializer_class = AnchorageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrEditOnly]
    
    def perform_create(self, serializer):
        # Set 'added_by' to the current user when creating an anchorage
        serializer.save(added_by=self.request.user)

class ChartReviewViewSet(viewsets.ModelViewSet):
    queryset = ChartReview.objects.all()
    serializer_class = ChartReviewSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

class UserBookmarkListView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Retrieves the UserProfile of the logged-in user
        return UserProfile.objects.get(user=self.request.user)