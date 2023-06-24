from django.contrib import admin
from .models import Employee, Company, EmployeeCompany, User

admin.site.register(Employee)
admin.site.register(Company)
admin.site.register(EmployeeCompany)

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'is_staff', 'is_superuser')

