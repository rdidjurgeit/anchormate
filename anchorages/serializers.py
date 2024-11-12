from rest_framework import serializers
from .models import UserProfile, Anchorage, ChartReview
from django.contrib.auth.models import User

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
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user