from rest_framework import viewsets
from .models import Anchorage, ChartReview
from .serializers import AnchorageSerializer, ChartReviewSerializer

class AnchorageViewSet(viewsets.ModelViewSet):
    queryset = Anchorage.objects.all()
    serializer_class = AnchorageSerializer

class ChartReviewViewSet(viewsets.ModelViewSet):
    queryset = ChartReview.objects.all()
    serializer_class = ChartReviewSerializer