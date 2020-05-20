from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('events/', views.Event_List.as_view()),
    path('home/', views.home),
    path('events/<name>/', views.event_detail),
    path('users/', views.User_List.as_view()),
    path('users/<int:pk>/', views.User_Detail.as_view()),
    path('register/', views.UserRegistrationAPIView.as_view(),
         name='register'),
    path('login/', views.UserLoginAPIView.as_view(),
         name='login'),

]
urlpatterns = format_suffix_patterns(urlpatterns)