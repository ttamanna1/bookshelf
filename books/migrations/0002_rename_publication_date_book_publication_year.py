# Generated by Django 5.0.1 on 2024-01-12 16:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='publication_date',
            new_name='publication_year',
        ),
    ]
