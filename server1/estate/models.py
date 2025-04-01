from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.

class Property(models.Model):

    PROPERTY_TYPES = [
        ('apartment', 'Apartment'),
        ('selfcontain', 'Selfcontain'),
        ('bungalow', 'Bungalow'),
        ('studio', 'Studio Apartment'),
        ('duplex', 'Duplex'),
        ('triplex/fourplex', 'Triplex/Fourplex'),
        ('detached', 'Detached House'),
        ('semi-detached', 'Semi-Detached House'),
        ('mansion', 'Mansion'),
        ('townhouse', 'Townhouse'),
        ('office', 'Office Space'),
        ('shop', 'Shop'),
        ('workspace', 'Workspace'),
        ('warehouse', 'Warehouse'),
        ('land', 'Land'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
    ]

    FENCE_TYPE = [
        ('none', 'No Fence'),
        ('dwarf', 'Dwarf Fence'),
        ('full', 'Full Fence'),
    ]

    LISTING_TYPE = [
        ('buy', 'Buy'),
        ('rent', 'Rent'),
        ('shortlet', 'Shortlet'),
    ]

    ROOM_MEASUREMENT = [
        ('sq_ft', 'Square Feet'),
        ('sq_m', 'Square Meter'),
    ]

    LAND_MEASUREMENT = [
        ('plots', 'Plots'),
        ('hectares', 'Hectares'),
        ('acres', 'Acres'),
    ]

    DURATION = [
        ('Per Annum', 'per_annum'),
        ('Per Month', 'Per_month'),
        ('Per Day', 'Per_day'),
    ]

# GENERAL CHARACTERISTICS
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES, blank=True, null=True)
    listing = models.CharField(max_length=255, choices=LISTING_TYPE, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available', blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    duration = models.CharField(max_length=20, choices=DURATION, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    floor_count = models.IntegerField(null=True, blank=True)
    fence = models.CharField(max_length=255, choices=FENCE_TYPE, default='none')
    gate = models.BooleanField(blank=True, null=True)
    solar = models.BooleanField(null=True, blank=True)
    measurement = models.DecimalField(max_digits=100, decimal_places=4, null=True, blank=True)
    agent_username = models.CharField(max_length=255, blank=True, null=True)
    agent_phone = models.CharField(max_length=255, blank=True, null=True)
    imagea = models.ImageField(upload_to='property_images/', blank=True, null=True)
    imageb = models.ImageField(upload_to='property_images/', blank=True, null=True)
    imagec = models.ImageField(upload_to='property_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    featured = models.BooleanField(default=False, blank=True, null=True) 
    parking_space = models.BooleanField(null=True, blank=True)
    unit = models.CharField(max_length=255, choices=ROOM_MEASUREMENT, null=True, blank=True)

# HOUSE CHARACTERISTICS
    bedrooms = models.IntegerField(null=True, blank=True)
    bathrooms = models.IntegerField(null=True, blank=True)
    garage = models.BooleanField(null=True, blank=True)
    swimming_pool = models.BooleanField(null=True, blank=True)

# COMMERCIAL CHARACTERISTICS
    elevator = models.BooleanField(null=True, blank=True)
    restroom = models.BooleanField(null=True, blank=True)

# LAND CHARACTERISTICS
    land_unit = models.CharField(max_length=255, choices=LAND_MEASUREMENT, null=True, blank=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = uuid.uuid4().hex[:8]
            while Property.objects.filter(slug=self.slug).exists():
                self.slug = uuid.uuid4().hex[:8]
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} - {self.property_type} - {self.slug}'


class Whishlist(models.Model):
    code = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    paid = models.BooleanField(default=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = uuid.uuid4().hex[:11]
            while Whishlist.objects.filter(code=self.code).exists():
                self.code = uuid.uuid4().hex[:11]
        super().save(*args, **kwargs)

    def __str__(self):
        if not self.user:
            return self.code
        return f'{self.user}, {self.code}'

class WhishlistItem(models.Model):
    whishlist = models.ForeignKey(Whishlist, on_delete=models.CASCADE, blank=True, null=True, related_name='whishlist')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        if not self.whishlist.user:
            return f'{self.property.title} - {self.whishlist.code}'
        return f'{self.property.title} - {self.whishlist.user}, {self.whishlist.code}'


class State(models.Model):
    state = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.state

class City(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE, null=True, blank=True, related_name='cities')
    city = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'{self.state.state}, {self.city}'