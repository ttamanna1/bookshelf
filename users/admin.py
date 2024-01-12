from django.contrib import admin, auth

# Register your models here.
admin.site.register(auth.get_user_model())