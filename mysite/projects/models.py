from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import os

class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField()
    project_file = models.FileField(upload_to='project_files/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def average_rating(self):
        ratings = self.ratings.all()
        if ratings:
            return sum(rating.stars for rating in ratings) / len(ratings)
        return 0

    def __str__(self):
        return self.name

class Rating(models.Model):
    project = models.ForeignKey(Project, related_name='ratings', on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

class Feedback(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.full_name}"