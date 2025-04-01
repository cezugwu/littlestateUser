import django_filters
from .models import Property

class ListFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass

class FilterProperty(django_filters.FilterSet):
    listing = django_filters.CharFilter(lookup_expr='iexact')
    property_type = ListFilter(field_name='property_type', lookup_expr='in')
    state = django_filters.CharFilter(lookup_expr='iexact')
    city = django_filters.CharFilter(lookup_expr='iexact')
    price = django_filters.RangeFilter()
    bedrooms = django_filters.CharFilter(lookup_expr='iexact')

    ordering = django_filters.OrderingFilter(
        fields = (
            ('price', 'price')
        )
    )

    class Meta:
        model = Property
        fields = ['property_type', 'state', 'city', 'price', 'bedrooms', 'listing']

