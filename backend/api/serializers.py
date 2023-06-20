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
    class Meta:
        model = EmployeeCompany
        fields = '__all__'