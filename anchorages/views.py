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

class BookmarkListView(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        anchorage_id = self.request.data['anchorage_id']
        serializer.save(user=self.request.user, anchorage_id=anchorage_id)
class BookmarkDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)