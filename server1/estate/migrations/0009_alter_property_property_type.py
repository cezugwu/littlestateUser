# Generated by Django 5.1.7 on 2025-03-18 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estate', '0008_rename_seller_username_property_agent_phone_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='property_type',
            field=models.CharField(blank=True, choices=[('apartment', 'Apartment'), ('selfcontain', 'Selfcontain')], max_length=20, null=True),
        ),
    ]
