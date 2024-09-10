from django.urls import path
from . import views
from django.conf.urls import include
from django.urls import re_path
urlpatterns = [
     path('home/', views.HomeView.as_view(), name ='home'),
     path('buyer/login/',views.buyer_login,name='buyer_login'),
     path('buyer/register/',views.buyer_register,name='buyer_register'),
     path('seller/login/',views.seller_login,name='seller_login'),
     path('seller/register/',views.seller_register,name='seller_register'),
     path('buyer/details/<int:pk>/',views.buyer_details.as_view(),name='buyer_details'),
     path('seller/details/<int:pk>/',views.seller_details.as_view(),name='seller_details'),
     re_path(r'^api/v1/', include('djoser.urls')),
     re_path(r'^api/v1/', include('djoser.urls.authtoken')),
]