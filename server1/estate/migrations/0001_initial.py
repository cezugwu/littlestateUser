# Generated by Django 5.1.7 on 2025-03-13 12:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('slug', models.SlugField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('property_type', models.CharField(blank=True, choices=[('house', 'House'), ('apartment', 'Apartment'), ('land', 'Land'), ('commercial', 'Commercial Property')], max_length=20, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('state', models.CharField(blank=True, max_length=100, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('bedrooms', models.IntegerField(blank=True, null=True)),
                ('bathrooms', models.IntegerField(blank=True, null=True)),
                ('square_feet', models.IntegerField(blank=True, null=True)),
                ('status', models.CharField(blank=True, choices=[('available', 'Available'), ('sold', 'Sold'), ('rented', 'Rented')], default='available', max_length=20, null=True)),
                ('seller_username', models.CharField(blank=True, max_length=255, null=True)),
                ('imagea', models.ImageField(blank=True, null=True, upload_to='property_images/')),
                ('imageb', models.ImageField(blank=True, null=True, upload_to='property_images/')),
                ('imagec', models.ImageField(blank=True, null=True, upload_to='property_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Whishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=255, null=True)),
                ('paid', models.BooleanField(blank=True, default=False, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='WhishlistItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='estate.property')),
                ('whishlist', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='whishlist', to='estate.whishlist')),
            ],
        ),
    ]
