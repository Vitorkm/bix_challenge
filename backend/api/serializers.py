from rest_framework import serializers
from .models import Employee, Company, EmployeeCompany

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class EmployeeCompanySerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = EmployeeCompany
        fields = ['id', 'employee_name', 'company_name', 'position', 'date_joined', 'date_left', 'on_vacation']