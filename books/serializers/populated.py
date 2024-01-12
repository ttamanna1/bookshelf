from .common import BookSerializer
from genres.serializers.common import GenreSerializer

class PopulatedBookSerializer(BookSerializer):
  genres = GenreSerializer(many=True)