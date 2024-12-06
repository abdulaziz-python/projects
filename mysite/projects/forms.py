from django import forms
from .models import Project, Rating, Feedback

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['name', 'description', 'link', 'project_file']

class RatingForm(forms.ModelForm):
    class Meta:
        model = Rating
        fields = ['stars']
        widgets = {
            'stars': forms.NumberInput(attrs={'min': '1', 'max': '5'})
        }

class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['full_name', 'email', 'phone_number', 'comment']