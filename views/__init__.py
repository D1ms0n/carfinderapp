# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view


from django.shortcuts import render

# Create your views here.

schema_view = get_swagger_view(title='Carfinder API')



#@login_required
def main(request):
    return render(request, 'carfinderapp/index.html', {})