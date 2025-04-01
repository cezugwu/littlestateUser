from django.urls import path
from . import views

urlpatterns = [
    path('post_user/', views.post_user),
    path('get_property/', views.get_property),
    path('get_filtered_property/', views.get_filtered_property),
    path('get_one_property/<slug:slug>/', views.get_one_property),
    path('post_property/', views.post_property),
    path('update_property/', views.update_property),
    path('whishlist_code/', views.whishlist_code),
    path('whishlist_user/', views.whishlist_user),
    path('code_whishlist/', views.code_whishlist),
    path('user_whishlist/', views.user_whishlist),
    path('list_whishlist_code/', views.list_whishlist_code),
    path('list_whishlist_user/', views.list_whishlist_user),
    path('post_state/', views.post_state),
    path('get_state/', views.get_state),
    path('get_city/', views.get_city),
]