from rest_framework import serializers
from .models import TourPackage, Hotel, Rental

<<<<<<< HEAD
class TourPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourPackage
        fields = '__all__'
=======

class TourPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourPackage
        fields = "__all__"

>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
<<<<<<< HEAD
        fields = '__all__'
=======
        fields = "__all__"

>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
<<<<<<< HEAD
        fields = '__all__' 
=======
        fields = "__all__"
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
