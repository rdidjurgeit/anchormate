from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'home_port', 'vessel_type')
    # Uncomment the line below if `bookmarked_anchorages` is a ManyToManyField
    # filter_horizontal = ('bookmarked_anchorages',)
