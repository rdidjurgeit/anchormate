from rest_framework import viewsets, generics
from django.contrib.auth.models import User

from .models import Anchorage, ChartReview
from .serializers import AnchorageSerializer, ChartReviewSerializer
from .serializers import UserRegistrationSerializer

class AnchorageViewSet(viewsets.ModelViewSet):
    queryset = Anchorage.objects.all()
    serializer_class = AnchorageSerializer

class ChartReviewViewSet(viewsets.ModelViewSet):
    queryset = ChartReview.objects.all()
    serializer_class = ChartReviewSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
