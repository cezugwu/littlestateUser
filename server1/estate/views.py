from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q
from decimal import Decimal
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Property, Whishlist, WhishlistItem, State, City

from .serializer import (PropertySerializer, WhishlistSerializer, WhishlistItemSerializer, AddingWhishlistItemSerializeruser, 
AddingWhishlistItemSerializercode, UserSerializer, PropertyPostSerializer, PropertyUpdateSerializer, StatePostSerializer, 
StateSerializer, CitySerializer)

from django.conf import settings
from .filters import FilterProperty
from rest_framework.pagination import PageNumberPagination


@api_view(['POST'])
def post_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)




@api_view(['GET'])
def get_property(request):
    property = Property.objects.filter(property_type__in=['apartment', 'selfcontain', 'studio'], featured=True)
    serializer = PropertySerializer(property, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_filtered_property(request):
    filtered_property = FilterProperty(request.GET, queryset=Property.objects.all())
    property = filtered_property.qs
    property_count = property.count()

    paginator = PageNumberPagination()
    paginator.page_size = 5
    paginated_queryset = paginator.paginate_queryset(property, request)

    serializer = PropertySerializer(paginated_queryset, many=True)
    return Response({'count':property_count, 'item_count':paginator.page_size, 'data':serializer.data})

def get_recommended_properties(slug):
    property = get_object_or_404(Property, slug=slug)
    price_min = property.price * Decimal('0.5')
    price_max = property.price * Decimal('1.5')

    recommendation = Property.objects.filter(
        Q(city=property.city) | Q(state=property.state),
        property_type=property.property_type,
        price__gte=price_min,
        price__lte=price_max,
    ).exclude(slug=slug)[:10]

    return recommendation


@api_view(['GET'])
def get_one_property(request, slug):
    property = get_object_or_404(Property, slug=slug)
    property_recommendation = get_recommended_properties(slug)

    serializer1 = PropertySerializer(property)
    serializer2 = PropertySerializer(property_recommendation, many=True)

    return Response({'data': serializer1.data, 'data_recommend': serializer2.data})

@api_view(['POST'])
def post_property(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header or auth_header != 'settings.PROPERTY_SECRETE_KEY':
        return Response({'error':'unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    serializer = PropertyPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
def update_property(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header or auth_header != 'settings.PROPERTY_SECRETE_KEY':
        return Response({'error':'unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    slug = request.data.get('slug')
    username = request.data.get('agent_username')
    property = get_object_or_404(Property, slug=slug, agent_username=username)

    serializer = PropertyUpdateSerializer(property, data=request.data, partial=request.method == 'PATCH')
    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)


@api_view(['POST'])
def whishlist_code(request):
    code = request.data.get('code')

    whishlist, created = Whishlist.objects.get_or_create(code=code, paid=False)
    serializer = WhishlistSerializer(whishlist)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def whishlist_user(request):
    username = request.data.get('username')
    user = get_object_or_404(User, username=username)

    whishlist, created = Whishlist.objects.get_or_create(user=user, paid=False)
    serializer = WhishlistSerializer(whishlist)
    return Response(serializer.data)

@api_view(['POST'])
def code_whishlist(request):
    serializer = AddingWhishlistItemSerializercode(data=request.data)
    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_whishlist(request):
    serializer = AddingWhishlistItemSerializeruser(data=request.data)
    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)

@api_view(['GET'])
def list_whishlist_code(request):
    code = request.GET.get('code')

    whishlist = get_object_or_404(Whishlist, code=code, paid=False)
    serializer = WhishlistSerializer(whishlist)
    return Response(serializer.data)

@api_view(['GET'])
def list_whishlist_user(request):
    username = request.GET.get('username')
    user = get_object_or_404(User, username=username)

    whishlist = get_object_or_404(Whishlist, user=user, paid=False)
    serializer = WhishlistSerializer(whishlist)
    return Response(serializer.data)

@api_view(['POST'])
def post_state(request):
    serializer = StatePostSerializer(data=request.data)
    if serializer.is_valid():
        result = serializer.save()
        return Response(result)
    return Response(serializer.errors)

@api_view(['GET'])
def get_state(request):
    state = State.objects.all()
    serializer = StateSerializer(state, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_city(request):
    state_data = request.GET.get('state')
    state = get_object_or_404(State, state=state_data) 
    city = City.objects.filter(state=state)
    serializer = CitySerializer(city, many=True)
    return Response(serializer.data)
