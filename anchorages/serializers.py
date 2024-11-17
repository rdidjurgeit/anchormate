from rest_framework import serializers
from .models import Anchorage, Bookmark
from django.contrib.auth.models import User

class AnchorageSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    seabed_type = serializers.CharField(default="Unknown")

    class Meta:
        model = Anchorage
        fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
    anchorage = AnchorageSerializer(read_only=True)

    class Meta:
        model = Bookmark
        fields = ['id', 'anchorage', 'created_at']
