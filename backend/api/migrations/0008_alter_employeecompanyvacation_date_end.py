# Generated by Django 4.2.2 on 2023-06-26 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_company_employeecompanyvacation_employee_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeecompanyvacation',
            name='date_end',
            field=models.DateField(blank=True, null=True),
        ),
    ]
