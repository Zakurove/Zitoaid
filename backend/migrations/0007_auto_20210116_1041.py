# Generated by Django 3.1.3 on 2021-01-16 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_auto_20210116_0949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cluster',
            name='sets',
            field=models.ManyToManyField(blank=True, related_name='clusters', to='backend.Set'),
        ),
    ]
