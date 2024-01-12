from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Genre
from .serializers.common import GenreSerializer
from .serializers.populated import PopulatedGenreSerializer

# Create your views here.
class GenreListCreateView(ListCreateAPIView):
  queryset = Genre.objects.all()
  serializer_class = GenreSerializer

class GenreDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Genre.objects.all()
  
  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedGenreSerializer
    return GenreSerializer