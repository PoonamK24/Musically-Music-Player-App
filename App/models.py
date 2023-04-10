from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Artist(models.Model):
    name= models.CharField(max_length=100)
    image= models.ImageField()

    def __str__(self):
        return self.name
        
class Song(models.Model):
    title= models.TextField()
    artist= models.ForeignKey(Artist, on_delete=models.CASCADE)
    image= models.ImageField()
    audio_file = models.FileField(blank=True,null=True)
    duration=models.CharField(max_length=20)

    def __str__(self):
        return self.title

