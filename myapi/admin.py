from django.contrib import admin
from myapi.models import *
from django.contrib.auth.admin import UserAdmin


# Register your models here

admin.site.register(Event)
admin.site.register(Participant)
admin.site.register(UserProfile)