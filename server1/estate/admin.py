from django.contrib import admin
from .models import Property, Whishlist, WhishlistItem, State, City

# Register your models here.
admin.site.register(Property)
admin.site.register(Whishlist)
admin.site.register(WhishlistItem)
admin.site.register(State)
admin.site.register(City)