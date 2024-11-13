from django.contrib import admin
from anchorages.models import Anchorage, ChartReview,UserProfile


# Register your models here.
@admin.register(Anchorage)
class AnchorageAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'latitude', 'longitude', 'depth', 'seabed_type', 'id')
    fields = ('name', 'location', 'latitude', 'longitude', 'depth', 'seabed_type', 'description')

admin.site.register(ChartReview,)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'home_port', 'vessel_type')
    filter_horizontal = ('bookmarked_anchorages',)

