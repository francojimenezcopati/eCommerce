# Generated by Django 5.0.2 on 2024-02-26 14:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("a_cart", "0002_cart_profile"),
        ("a_users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cart",
            name="profile",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="a_users.profile"
            ),
        ),
    ]
