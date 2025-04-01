from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Property, Whishlist, WhishlistItem, State, City


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({'message':'password does not match'})
        return data
    
    def create(self, validated_data):
        password1 = validated_data.pop('password1')
        password2 = validated_data.pop('password2')
        user = User.objects.create(password=password1, **validated_data)
        return {'message':'user created successfully'}






class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        

class PropertyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
                    'listing', 'title', 'slug', 'description', 'property_type', 
                    'price', 'state', 'city', 'bedrooms', 'bathrooms', 'measurement',
                    'parking_space', 'garage', 'floor_count', 'swimming_pool',
                    'solar', 'status', 'agent_username', 'agent_phone', 'imagea',
                    'imageb', 'imagec', 'created_at', 'updated_at', 'fence', 'gate',
                    'unit', 'elevator', 'restroom', 'land_unit', 'duration'
                ]




class PropertyUpdateSerializer(serializers.ModelSerializer):
    agent_username = serializers.CharField(write_only=True)
    slug = serializers.CharField(write_only=True)

    class Meta:
        model = Property
        fields = [
                    'agent_username', 'slug', 
                    'listing', 'title', 'description', 'property_type', 'price', 'state', 
                    'city', 'bedrooms', 'bathrooms', 'measurement', 'parking_space', 
                    'garage', 'floor_count', 'swimming_pool', 'solar', 'status', 'agent_phone', 
                    'imagea', 'imageb', 'imagec', 'created_at', 'updated_at', 'fence', 'gate',
                    'unit', 'elevator', 'restroom', 'land_unit', 'duration'
                ]

    def update(self, instance, validated_data):
        username = validated_data.pop('agent_username')
        slug = validated_data.pop('slug')

        if instance.agent_username != username and instance.slug != slug:
            return serializers.ValidationError({'message':'property does not exist'})
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return {'message':'property updated sucessfully'}



class AddingWhishlistItemSerializercode(serializers.ModelSerializer):
    code = serializers.CharField(write_only=True, required=False)
    slug = serializers.CharField(write_only=True, required=False)
    action = serializers.ChoiceField(choices=['add', 'remove'], write_only=True, required=False)

    class Meta:
        model = WhishlistItem
        fields = ['code', 'slug', 'action']

    def create(self, validate_data):
        code = validate_data['code']
        slug = validate_data['slug']
        action = validate_data['action']

        whishlist = get_object_or_404(Whishlist, code=code, paid=False)
        property = get_object_or_404(Property, slug=slug)
        Whishlistitem, create = WhishlistItem.objects.get_or_create(whishlist=whishlist, property=property)

        if action == 'remove':
            Whishlistitem.delete()
            return {'message': 'Property removed from wishlist'}
        return {'message': 'Property added to wishlist'}

class AddingWhishlistItemSerializeruser(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=False)
    slug = serializers.CharField(write_only=True, required=False)
    action = serializers.ChoiceField(choices=['add', 'remove', ''], write_only=True, required=False)
    
    class Meta:
        model = WhishlistItem
        fields = ['username', 'slug', 'action']
    
    def create(self, validated_data):
        username = validated_data['username']
        slug = validated_data['slug']
        action = validated_data['action']

        user = get_object_or_404(User, username=username)
        whishlist = get_object_or_404(Whishlist, user=user, paid=False)
        property = get_object_or_404(Property, slug=slug)
        whishlistitem, create = WhishlistItem.objects.get_or_create(whishlist=whishlist, property=property)

        if action == 'remove':
            whishlistitem.delete()

            return {'message': 'Property removed from wishlist'}
        return {'message': 'Property added to wishlist'}
    
class WhishlistItemSerializer(serializers.ModelSerializer): 
    property = PropertySerializer(read_only=True)
    class Meta:
        model = WhishlistItem
        fields = ['property']

class WhishlistSerializer(serializers.ModelSerializer):
    whishlist = WhishlistItemSerializer(many=True, read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Whishlist
        fields = ['code', 'username', 'created_at', 'updated_at', 'paid', 'whishlist']

    def get_username(self, obj):
        if not obj.user:
            return None
        username = obj.user.username
        return username

class StatePostSerializer(serializers.ModelSerializer):
    state = serializers.CharField(write_only=True)
    city = serializers.CharField(write_only=True)

    class Meta:
        model = City
        fields = ['state', 'city']

    def create(self, validated_data):
        state = validated_data.pop('state')
        city = validated_data.pop('city')

        if not State.objects.filter(state=state).exists():
            state = State.objects.create(state=state)
            city = City.objects.create(state=state, city=city)
            return {'message':'New state and city created'}
        state, created = State.objects.get_or_create(state=state)
        city, created = City.objects.get_or_create(state=state, city=city)
        return {'message':'new city created'}
    
class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'state']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'city']
