from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class Anchorage(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    depth = models.FloatField()
    seabed_type = models.CharField(max_length=50)
    description = models.TextField()
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # Use added_by instead of user to avoid pylint confusion
        return f"Anchorage at {self.location} by {self.added_by.username}"

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    anchorage = models.ForeignKey(Anchorage, on_delete=models.CASCADE, related_name='bookmarked_by')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} bookmarked {self.anchorage.name}"