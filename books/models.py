from django.db import models

# Create your models here.
class Book(models.Model):
  title = models.CharField(max_length=300)
  author = models.CharField(max_length=300)
  publication_year = models.PositiveIntegerField()
  image = models.CharField(max_length=1000)
  genres = models.ManyToManyField(
    to='genres.Genre',
    related_name='books'
  )
  owner = models.ForeignKey(
    to='users.User',
    on_delete=models.CASCADE,
    related_name='owned_books',
    null=True
  )

  def __str__(self):
    return f'{self.title} ({self.publication_year}) - Author: {self.author}'