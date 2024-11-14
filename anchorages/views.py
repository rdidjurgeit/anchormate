from rest_framework import viewsets, generics
from .models import Anchorage, Bookmark
from .serializers import AnchorageSerializer, BookmarkSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

class AnchorageViewSet(viewsets.ModelViewSet):
    queryset = Anchorage.objects.all()
    serializer_class = AnchorageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

class BookmarkListView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookmarkDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)