# Generated by Django 5.0.2 on 2024-02-27 21:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("a_users", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="address",
            old_name="street",
            new_name="address",
        ),
        migrations.RenameField(
            model_name="address",
            old_name="postal_code",
            new_name="zipcode",
        ),
    ]