# Generated by Django 3.0.7 on 2020-08-12 18:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('content_phylums', '0006_auto_20200808_1158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='junct_snd_note',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='note_snd', to='content_phylums.Note'),
        ),
        migrations.AlterUniqueTogether(
            name='ccpick',
            unique_together={('owner', 'name')},
        ),
        migrations.AlterUniqueTogether(
            name='deck',
            unique_together={('owner', 'name')},
        ),
        migrations.AlterUniqueTogether(
            name='format',
            unique_together={('owner', 'name')},
        ),
        migrations.AlterUniqueTogether(
            name='groupdeck',
            unique_together={('owner', 'name')},
        ),
        migrations.AlterUniqueTogether(
            name='note',
            unique_together={('owner', 'name')},
        ),
    ]
