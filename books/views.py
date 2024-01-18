from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Book
from .serializers.common import BookSerializer
from .serializers.populated import PopulatedBookSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly

# PATH: /records/
# Method: GET, POST
class BookListCreateView(OwnerListCreateView):
  serializer_class = BookSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    status = self.request.query_params.get('status', None)  
    if status:
        # If status is provided, filter by status
        return Book.objects.prefetch_related('genres').filter(status=status, owner=self.request.user)
    else:
        # If no status is provided, return all books
        return Book.objects.prefetch_related('genres').filter(owner=self.request.user)

  def perform_create(self, serializer):
    # Default to 'wishlist' if 'status' is not provided in the request
    status_value = self.request.data.get('status', 'wishlist')
    serializer.save(owner=self.request.user, status=status_value)

# PATH: /records/:id
# Method: GET, PUT, PATCH, DELETE
class BookDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Book.objects.prefetch_related('genres').all()
  permission_classes = [IsOwnerOrReadOnly]

  def get_serializer_class(self):
    print('self request method -->', self.request.method)
    if self.request.method == 'PUT':
      return BookSerializer
    return PopulatedBookSerializer
  
  def update(self, request, *args, **kwargs):
    if 'status' in request.data:
      # Update the status to the provided value
      request.data['status'] = request.data['status']
    else:
        # If 'status' is not present, leave it unchanged
        request.data['status'] = self.get_object().status
    return super().update(request, *args, **kwargs)
      