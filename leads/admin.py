from django.contrib import admin
from .models import RespMicro, RespMicroImage
# Register your models here.

class RespMicroImageInline(admin.TabularInline):
    model = RespMicroImage
    extra = 3

class RespMicroAdmin(admin.ModelAdmin):
    inlines = [ RespMicroImageInline, ]

admin.site.register(RespMicro, RespMicroAdmin)
