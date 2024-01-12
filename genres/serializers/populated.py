from .common import GenreSerializer
from books.serializers.common import BookSerializer

class PopulatedGenreSerializer(GenreSerializer):
  books = BookSerializer(many=True)