from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Project, Rating, Feedback
from .forms import ProjectForm, RatingForm, FeedbackForm

def project_list(request):
    projects = Project.objects.all().order_by('-created_at')
    return render(request, 'projects/project_list.html', {'projects': projects})

def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        rating_form = RatingForm(request.POST)
        if rating_form.is_valid():
            rating = rating_form.save(commit=False)
            rating.project = project
            rating.save()
            messages.success(request, 'Rating submitted successfully!')
            return redirect('project_detail', pk=pk)
    else:
        rating_form = RatingForm()
    return render(request, 'projects/project_detail.html', {
        'project': project,
        'rating_form': rating_form
    })

@login_required
def project_create(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Project created successfully!')
            return redirect('project_list')
    else:
        form = ProjectForm()
    return render(request, 'projects/project_form.html', {'form': form})

def feedback_list(request):
    feedbacks = Feedback.objects.all().order_by('-created_at')
    return render(request, 'projects/feedback_list.html', {'feedbacks': feedbacks})

def feedback_create(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Feedback submitted successfully!')
            return redirect('feedback_list')
    else:
        form = FeedbackForm()
    return render(request, 'projects/feedback_form.html', {'form': form})