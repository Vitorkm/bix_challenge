from .models import Employee, Company, EmployeeCompany
from .serializers import EmployeeSerializer, CompanySerializer, EmployeeCompanySerializer
from rest_framework import viewsets


class EmployeeView(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class CompanyView(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class EmployeeCompanyView(viewsets.ModelViewSet):
    queryset = EmployeeCompany.objects.all()
    serializer_class = EmployeeCompanySerializer

