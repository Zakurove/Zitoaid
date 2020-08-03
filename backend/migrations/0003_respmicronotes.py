# Generated by Django 3.0.3 on 2020-07-22 22:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20200721_2002'),
    ]

    operations = [
        migrations.CreateModel(
            name='RespMicroNotes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True, null=True)),
                ('x_dim', models.IntegerField(blank=True, null=True)),
                ('y_dim', models.IntegerField(blank=True, null=True)),
                ('respMicroImage', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='setNotes', to='backend.RespMicroImage')),
            ],
        ),
    ]