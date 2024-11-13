from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
        

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    home_port = models.CharField(max_length=100)
    vessel_type = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    bookmarked_anchorages = models.ManyToManyField('Anchorage', blank=True, related_name='bookmarked_by')

    def __str__(self):
        return f"{self.user.username}'s profile"

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
        return self.name 

class ChartReview(models.Model):
    anchorage = models.ForeignKey(Anchorage, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.anchorage.name}"
    
    class Bookmark(models.Model):
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        anchorage = models.ForeignKey(Anchorage, on_delete=models.CASCADE)
        created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} bookmarked {self.anchorage.name}"