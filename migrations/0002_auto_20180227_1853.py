# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-02-27 18:53
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('carfinderapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='snoop',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='snoops', to=settings.AUTH_USER_MODEL),
        ),
    ]
