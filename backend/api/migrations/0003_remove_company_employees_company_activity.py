# Generated by Django 4.2.2 on 2023-06-20 00:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_employeecompany_date_left'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='employees',
        ),
        migrations.AddField(
            model_name='company',
            name='activity',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
