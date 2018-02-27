# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
#@login_required
def main(request):
    return render(request, 'carfinderapp/index.html', {})