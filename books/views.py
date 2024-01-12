from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Book
from .serializers.common import BookSerializer
from .serializers.populated import PopulatedBookSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly

# PATH: /records/
# Method: GET, POST
class BookListCreateView(OwnerListCreateView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

# PATH: /records/:id
# Method: GET, PUT, PATCH, DELETE
class BookDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
      print('self request method -->', self.request.method)
      if self.request.method == 'PUT':
        return BookSerializer
      return PopulatedBookSerializer
    