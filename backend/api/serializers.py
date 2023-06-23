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
        fields = ['id', 'employee_name', 'employee_id', 'company_name', 'position', 'date_joined', 'date_left', 'on_vacation']

    def to_internal_value(self, data):
        internal_value = super().to_internal_value(data)

        employee_name = data.get('employee_name')
        company_name = data.get('company_name')

        if employee_name:
            employee = Employee.objects.get(name=employee_name)
            internal_value['employee'] = employee

        if company_name:
            company = Company.objects.get(name=company_name)
            internal_value['company'] = company

        return internal_value