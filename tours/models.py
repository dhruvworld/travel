from django.db import models

<<<<<<< HEAD
=======

>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
class TourPackage(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField(help_text="Duration in days")
<<<<<<< HEAD
    image = models.ImageField(upload_to='tours/', blank=True, null=True)
=======
    image = models.ImageField(upload_to="tours/", blank=True, null=True)
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

<<<<<<< HEAD
=======

>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
class Hotel(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
<<<<<<< HEAD
    image = models.ImageField(upload_to='hotels/', blank=True, null=True)
=======
    image = models.ImageField(upload_to="hotels/", blank=True, null=True)
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.location}"

<<<<<<< HEAD
class Rental(models.Model):
    RENTAL_TYPES = [
        ('car', 'Car'),
        ('bike', 'Bike'),
        ('scooter', 'Scooter'),
=======

class Rental(models.Model):
    RENTAL_TYPES = [
        ("car", "Car"),
        ("bike", "Bike"),
        ("scooter", "Scooter"),
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    ]
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=50, choices=RENTAL_TYPES)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
<<<<<<< HEAD
    image = models.ImageField(upload_to='rentals/', blank=True, null=True)
=======
    image = models.ImageField(upload_to="rentals/", blank=True, null=True)
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
<<<<<<< HEAD
        return f"{self.name} ({self.get_type_display()})" 
=======
        return f"{self.name} ({self.get_type_display()})"
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
