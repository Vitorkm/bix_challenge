# Generated by Django 4.2.2 on 2023-06-29 20:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_company_picture_png'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='picture',
        ),
    ]
