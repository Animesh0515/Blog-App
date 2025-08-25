from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register"),
    path("login/", views.login_user, name="login"),
    path("posts/", views.list_posts),
    path("posts/<int:post_id>/", views.post_detail),
    path("posts/create/", views.create_post),
    path("posts/<int:post_id>/edit/", views.edit_post),
    path("posts/<int:post_id>/delete/", views.delete_post),
]