from django.contrib import admin
from .models import Employee, Company, EmployeeCompany

admin.site.register(Employee)
admin.site.register(Company)
admin.site.register(EmployeeCompany)

