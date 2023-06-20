from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Company(models.Model):
    name = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)
    lauch_date = models.DateField()
    location = models.CharField(max_length=100)
    picture = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class EmployeeCompany(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    position = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    date_joined = models.DateField()
    date_left = models.DateField(blank=True, null=True)
    on_vacation = models.BooleanField(default=False)

    def __str__(self):
        return self.employee.name + " - " + self.company.name