from .models import Employee, Company, EmployeeCompany, EmployeeCompanyVacation
from .serializers import EmployeeSerializer, CompanySerializer, EmployeeCompanySerializer, MyTokenObtainPairSerializer, EmployeeCompanyVacationSerializer
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
    
@permission_classes([IsAuthenticated])
class EmployeeCompanyVacationView(viewsets.ModelViewSet):
    serializer_class = EmployeeCompanyVacationSerializer

    def get_queryset(self):
        queryset = EmployeeCompanyVacation.objects.all()
        employee_id = self.request.query_params.get('employee_id')
        if employee_id:
            queryset = queryset.filter(employee_company__employee_id=employee_id)
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

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getTimeLine(request):
    employee_id = request.query_params.get('employee_id')
    vacation = EmployeeCompanyVacation.objects.filter(employee_company__employee_id=employee_id)
    job = EmployeeCompany.objects.filter(employee_id=employee_id)
    serializer_vacation = EmployeeCompanyVacationSerializer(vacation, many=True)
    serializer_job = EmployeeCompanySerializer(job, many=True)

    vacation_data = serializer_vacation.data
    vacation_info = [
        {
            'type': 'date_start',
            'date': item['date_start'],
            'company_name': item['company_name']
        }
        for item in vacation_data
    ]

    job_data = serializer_job.data
    job_info = [
        {
            'type': 'date_joined',
            'date': item['date_joined'],
            'company_name': item['company_name']
        }
        for item in job_data
    ]

    timeline = vacation_info + job_info
    
    for item in vacation_data:
        if item['date_end']:
            timeline.append({
                'type': 'date_end',
                'date': item['date_end'],
                'company_name': item['company_name']
            })
    
    for item in job_data:
        if item['date_left']:
            timeline.append({
                'type': 'date_left',
                'date': item['date_left'],
                'company_name': item['company_name']
            })

    timeline_sorted = sorted(timeline, key=lambda x: x['date'])

    return Response(timeline_sorted)