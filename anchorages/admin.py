from django.contrib import admin
from anchorages.models import Anchorage, Bookmark

@admin.register(Anchorage)
class AnchorageAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'latitude', 'longitude', 'depth', 'seabed_type', 'id')
    fields = ('name', 'location', 'latitude', 'longitude', 'depth', 'seabed_type', 'description')
    
admin.site.register(Bookmark)