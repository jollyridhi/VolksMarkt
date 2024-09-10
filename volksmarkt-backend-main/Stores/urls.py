"""volksmarkt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.StoreList.as_view(), name='storelist'),
    path('<int:pk>/',views.StoreDetail.as_view(), name='store-detail'),
    path('<int:pk>/productlist/',views.StoreWiseProductList.as_view(), name='store_productlist'),
    path('Category/<str:cat>/',views.CategoryWiseStoreList.as_view(), name='category-wise-stores'),
]
