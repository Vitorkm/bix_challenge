from .models import Employee, Company, EmployeeCompany
from .serializers import EmployeeSerializer, CompanySerializer, EmployeeCompanySerializer, MyTokenObtainPairSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response



@permission_classes([IsAuthenticated])
class EmployeeView(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

@permission_classes([IsAuthenticated])
class CompanyView(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

@permission_classes([IsAuthenticated])
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
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)

