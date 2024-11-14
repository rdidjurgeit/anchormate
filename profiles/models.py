from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile')
    home_port = models.CharField(max_length=100)
    vessel_type = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    # Explicitly declare the objects manager to satisfy pylint
    objects = models.Manager()

    def __str__(self):
        # Ensure a string return type for pylint
        return f"{self.user.username}'s profile"

def create_userprofile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

post_save.connect(create_userprofile, sender=User)



