from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TourPackage, Hotel, Rental
from .serializers import TourPackageSerializer, HotelSerializer, RentalSerializer

class TourPackageViewSet(viewsets.ModelViewSet):
    queryset = TourPackage.objects.all()
    serializer_class = TourPackageSerializer

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer

@api_view(['GET'])
def dashboard_stats(request):
    return Response({
        'total_packages': TourPackage.objects.count(),
        'total_hotels': Hotel.objects.count(),
        'total_rentals': Rental.objects.count(),
        'active_packages': TourPackage.objects.filter(is_active=True).count(),
    }) 