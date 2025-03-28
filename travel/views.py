from django.shortcuts import render
from .models import TourPackage, Hotel, Rental

def tour_packages(request):
    # Get all active packages, ordered by newest first
    packages = TourPackage.objects.filter(is_active=True).order_by('-created_at')
    return render(request, 'tours/packages.html', {'packages': packages})

def hotel_list(request):
    hotels = Hotel.objects.filter(is_active=True).order_by('-created_at')
    return render(request, 'hotels/list.html', {'hotels': hotels})

def rental_list(request):
    rentals = Rental.objects.filter(is_active=True).order_by('-created_at')
    return render(request, 'rentals/list.html', {'rentals': rentals}) 