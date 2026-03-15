from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from button_of_nothing.models import NothingButtonState
import json

# Create your views here.

def index(request):
    return render(request, 'button-of-nothing.html')


def activate(request):
    buttonState = NothingButtonState.objects.first()
    if buttonState:
        buttonState.activate()
        return HttpResponse(status=200)
    return HttpResponse(status=404)


def deactivate(request):
    buttonState = NothingButtonState.objects.first()
    if buttonState:
        buttonState.deactivate()
        return HttpResponse(status=200)
    return HttpResponse(status=404)


def get_state(request):
    buttonState = NothingButtonState.objects.first()
    if buttonState:
        data = {
            "state":buttonState.status
        }
    else:
        data = {
            "state":"Nonexistant"
        }
    return HttpResponse(json.dumps(data), content_type='application/json')


def create(request):
    buttonState = NothingButtonState.objects.first()
    # Only create a button state if no previous button state exists (there is only 1 button)
    if not buttonState:
        NothingButtonState(status=False).save()
    return HttpResponse(status=200)
