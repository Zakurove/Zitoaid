# Generated by Django 3.2 on 2022-03-04 10:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0024_practiceidentifysession_images'),
    ]

    operations = [
        migrations.DeleteModel(
            name='EmailList',
        ),
        migrations.RemoveField(
            model_name='practicedescsession',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='practicedescsession',
            name='practiceDescInputs',
        ),
        migrations.RemoveField(
            model_name='practicedescsession',
            name='sets',
        ),
        migrations.RemoveField(
            model_name='practiceidentifysession',
            name='images',
        ),
        migrations.RemoveField(
            model_name='practiceidentifysession',
            name='owner',
        ),
        migrations.DeleteModel(
            name='PracticeDescInput',
        ),
        migrations.DeleteModel(
            name='PracticeDescSession',
        ),
        migrations.DeleteModel(
            name='PracticeIdentifySession',
        ),
    ]
