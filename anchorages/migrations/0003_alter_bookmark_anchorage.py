# Generated by Django 4.2.16 on 2024-11-13 20:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('anchorages', '0002_bookmark'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookmark',
            name='anchorage',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to='anchorages.anchorage'),
        ),
    ]
