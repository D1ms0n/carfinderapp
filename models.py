# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Snoop(models.Model):
    class Meta(object):
        verbose_name = u"Snoop"
        verbose_name_plural = u"Snoops"
    def __unicode__(self):
        return u"%s..." % (self.pk)

    model        = models.CharField(max_length=256, blank=False, verbose_name=u"Model", null=True)
    manufacturer = models.CharField(max_length=256, blank=False, verbose_name=u"Manufacturer", null= True)

    year_min     = models.IntegerField(blank=True,null=True, verbose_name=u"Year min")
    year_max     = models.IntegerField(blank=True,null=True, verbose_name=u"Year max")
    mileage_min  = models.IntegerField(blank=True, null=True, verbose_name=u"Mileage min")
    mileage_max  = models.IntegerField(blank=True, null=True, verbose_name=u"Mileage max")

    user         = models.ForeignKey(User, blank = True, null= True, related_name='snoops', on_delete=models.CASCADE)



class Car(models.Model):
    class Meta(object):
        verbose_name = u"Car"
        verbose_name_plural = u"Cars"
    def __unicode__(self):
        return u"%s..." % (self.snoop_id)

    manufacturer = models.CharField(max_length=256, blank=False, verbose_name=u"Manufacturer", null= True)
    model        = models.CharField(max_length=256, blank=False, verbose_name=u"Model", null=True)
    color        = models.CharField(max_length=256, blank=True, verbose_name=u"Color", null= True)

    year         = models.IntegerField(blank=True,verbose_name=u"Year")
    mileage      = models.IntegerField(blank=True,verbose_name=u"Mileage")

    snoop        = models.ForeignKey(Snoop, related_name='cars', on_delete=models.CASCADE)
