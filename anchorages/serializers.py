from rest_framework import serializers
from .models import UserProfile, Anchorage, ChartReview

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['home_port', 'vessel_type', 'bio']

class AnchorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anchorage
        fields = '__all__'

class ChartReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChartReview
        fields = '__all__'