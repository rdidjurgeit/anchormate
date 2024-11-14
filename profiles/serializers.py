from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ReadOnlyField(source='profile.image.url')
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'home_port', 'vessel_type', 'bio', 'profile_image']
        read_only_fields = ['user']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user