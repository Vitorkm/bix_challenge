from django.contrib import admin
from .models import Employee, Company, EmployeeCompany, EmployeeCompanyVacation

admin.site.register(Employee)
admin.site.register(Company)
admin.site.register(EmployeeCompany)
admin.site.register(EmployeeCompanyVacation)

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'is_staff', 'is_superuser')

