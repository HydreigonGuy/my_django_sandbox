from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("", include("web.urls")),
    path("button-of-nothing/", include("button_of_nothing.urls")),
    path("admin/", admin.site.urls),
]