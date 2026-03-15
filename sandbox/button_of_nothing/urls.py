from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get", views.get_state),
    path("create", views.create),
    path("activate", views.activate),
    path("deactivate", views.deactivate),
]
