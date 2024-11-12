from django.contrib import admin
from anchorages.models import Anchorage, ChartReview

# Register your models here.
@admin.register(Anchorage)
class AnchorageAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'latitude', 'longitude', 'depth', 'seabed_type')
    fields = ('name', 'location', 'latitude', 'longitude', 'depth', 'seabed_type', 'description')

admin.site.register(ChartReview)

