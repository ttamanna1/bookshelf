from django.urls import path
from .views import GenreListCreateView, GenreDetailView

urlpatterns = [
  path('', GenreListCreateView.as_view()),
  path('<int:pk>/', GenreDetailView.as_view())
]