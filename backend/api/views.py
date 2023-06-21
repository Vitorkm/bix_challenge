from .models import Employee, Company, EmployeeCompany
from .serializers import EmployeeSerializer, CompanySerializer, EmployeeCompanySerializer
from rest_framework import viewsets
from rest_framework.response import Response




class EmployeeView(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class CompanyView(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class EmployeeCompanyView(viewsets.ModelViewSet):
    serializer_class = EmployeeCompanySerializer

    def get_queryset(self):
        queryset = EmployeeCompany.objects.all()
        employee_id = self.request.query_params.get('employee_id')
        company_id = self.request.query_params.get('company_id')

        if employee_id:
            queryset = queryset.filter(employee_id=employee_id)
        elif company_id:
            queryset = queryset.filter(company_id=company_id)
        else:
            queryset = queryset.all()
            
        return queryset





