# Generated by Django 5.0.1 on 2024-01-12 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_rename_publication_date_book_publication_year'),
        ('genres', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='genres',
        ),
        migrations.AddField(
            model_name='book',
            name='genres',
            field=models.ManyToManyField(related_name='books', to='genres.genre'),
        ),
    ]
