from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^market/$', views.market, name='market'),
    url(r'^mine/$', views.mine, name='mine'),
    url(r'^cart/$', views.cart, name='cart'),
]
