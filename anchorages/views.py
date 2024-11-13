from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from .models import Anchorage, ChartReview
from .serializers import AnchorageSerializer, ChartReviewSerializer
from .serializers import UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrEditOnly

class AnchorageViewSet(viewsets.ModelViewSet):
    queryset = Anchorage.objects.all()
    serializer_class = AnchorageSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrEditOnly]
    
    def perform_create(self, serializer):
        # Set 'added_by' to the current user when creating an anchorage
        serializer.save(added_by=self.request.user)

class ChartReviewViewSet(viewsets.ModelViewSet):
    queryset = ChartReview.objects.all()
    serializer_class = ChartReviewSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
