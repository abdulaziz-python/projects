from django.urls import path
from . import views

urlpatterns = [
    path('', views.project_list, name='project_list'),
    path('project/<int:pk>/', views.project_detail, name='project_detail'),
    path('project/create/', views.project_create, name='project_create'),
    path('feedback/', views.feedback_list, name='feedback_list'),
    path('feedback/create/', views.feedback_create, name='feedback_create'),
]