# Generated by Django 5.1.7 on 2025-03-23 09:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estate', '0010_state_city'),
    ]

    operations = [
        migrations.CreateModel(
            name='BaseProperty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('slug', models.SlugField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.CharField(blank=True, choices=[('available', 'Available'), ('sold', 'Sold'), ('rented', 'Rented')], default='available', max_length=20, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('state', models.CharField(blank=True, max_length=100, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('agent_username', models.CharField(blank=True, max_length=255, null=True)),
                ('agent_phone', models.CharField(blank=True, max_length=255, null=True)),
                ('imagea', models.ImageField(blank=True, null=True, upload_to='property_images/')),
                ('imageb', models.ImageField(blank=True, null=True, upload_to='property_images/')),
                ('imagec', models.ImageField(blank=True, null=True, upload_to='property_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('fence', models.CharField(choices=[('none', 'No Fence'), ('dwarf', 'Dwarf Fence'), ('full', 'Full Fence')], default='none', max_length=255)),
                ('gate', models.BooleanField(blank=True, default=False, null=True)),
                ('featured', models.BooleanField(blank=True, default=False, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CommercialProperty',
            fields=[
                ('baseproperty_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='estate.baseproperty')),
                ('square_feet', models.IntegerField(blank=True, null=True)),
                ('floor_level', models.IntegerField(blank=True, null=True)),
                ('parking_space', models.IntegerField(blank=True, null=True)),
                ('air_conditioning', models.BooleanField(blank=True, default=False, null=True)),
                ('elevator', models.BooleanField(blank=True, default=False, null=True)),
                ('solar', models.BooleanField(blank=True, default=False, null=True)),
                ('restroom', models.BooleanField(blank=True, default=False, null=True)),
            ],
            bases=('estate.baseproperty',),
        ),
        migrations.CreateModel(
            name='HouseProperty',
            fields=[
                ('baseproperty_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='estate.baseproperty')),
                ('property_type', models.CharField(blank=True, choices=[('apartment', 'Apartment'), ('selfcontain', 'Selfcontain'), ('studio', 'Studio Apartment'), ('duplex', 'Duplex'), ('triplex/fourplex', 'Triplex/Fourplex'), ('detached', 'Detached House'), ('semi-detached', 'Semi-Detached House'), ('mansion', 'Mansion'), ('townhouse', 'Townhouse')], max_length=20, null=True)),
                ('bedrooms', models.IntegerField(blank=True, null=True)),
                ('bathrooms', models.IntegerField(blank=True, null=True)),
                ('square_feet', models.IntegerField(blank=True, null=True)),
                ('parking_space', models.BooleanField(blank=True, default=False, null=True)),
                ('garage', models.BooleanField(blank=True, default=False, null=True)),
                ('floor_count', models.IntegerField(blank=True, null=True)),
                ('swimming_pool', models.BooleanField(blank=True, default=False, null=True)),
                ('solar', models.BooleanField(blank=True, default=False, null=True)),
            ],
            bases=('estate.baseproperty',),
        ),
        migrations.CreateModel(
            name='LandProperty',
            fields=[
                ('baseproperty_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='estate.baseproperty')),
                ('hectares', models.DecimalField(blank=True, decimal_places=4, max_digits=100, null=True)),
                ('acres', models.DecimalField(blank=True, decimal_places=4, max_digits=100, null=True)),
            ],
            bases=('estate.baseproperty',),
        ),
        migrations.AlterField(
            model_name='whishlistitem',
            name='property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='estate.houseproperty'),
        ),
        migrations.DeleteModel(
            name='Property',
        ),
    ]
