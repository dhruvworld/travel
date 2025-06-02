from django.contrib import admin
from .models import TourPackage, Hotel, Rental

<<<<<<< HEAD
@admin.register(TourPackage)
class TourPackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration', 'is_active')
    list_filter = ('is_active', 'duration')
    search_fields = ('name', 'description')
    list_editable = ('is_active', 'price')

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'price_per_night', 'is_active')
    list_filter = ('is_active', 'location')
    search_fields = ('name', 'location')
    list_editable = ('price_per_night', 'is_active')

@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'price_per_day', 'is_active')
    list_filter = ('is_active', 'type')
    search_fields = ('name',)
    list_editable = ('price_per_day', 'is_active') 
=======

@admin.register(TourPackage)
class TourPackageAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "duration", "is_active")
    list_filter = ("is_active", "duration")
    search_fields = ("name", "description")
    list_editable = ("is_active", "price")


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "price_per_night", "is_active")
    list_filter = ("is_active", "location")
    search_fields = ("name", "location")
    list_editable = ("price_per_night", "is_active")


@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "price_per_day", "is_active")
    list_filter = ("is_active", "type")
    search_fields = ("name",)
    list_editable = ("price_per_day", "is_active")
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
