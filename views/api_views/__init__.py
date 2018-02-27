from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework import generics
from rest_framework import pagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer

from carfinderapp.serializers import *
from carfinderapp.models import *



class SnoopList(generics.ListCreateAPIView):
    serializer_class = SnoopSerializer
    renderer_classes = (JSONRenderer,)

    def get_queryset(self):
        return Snoop.objects.all()

class SnoopDetail(generics.RetrieveAPIView):
    queryset = Snoop.objects.all()
    serializer_class = SnoopSerializerWithCars
    renderer_classes = (JSONRenderer,)
    lookup_field = 'pk'



class CarList(generics.ListCreateAPIView):
    serializer_class = CarSerializer
    renderer_classes = (JSONRenderer,)

    def get_queryset(self):
        return Car.objects.all()

class CarDetail(generics.RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    renderer_classes = (JSONRenderer,)
    lookup_field = 'pk'