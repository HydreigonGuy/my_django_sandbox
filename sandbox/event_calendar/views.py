from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from event_calendar.models import Event
import json
from datetime import date, timedelta, time, datetime


def index(request):
    return render(request, 'event_calendar.html')


def get_events(request):
    # Date of when we start looking for Events (today by default)
    query_start = date.today()
    if request.GET.get("start"):
        query_start = date.strptime(request.GET["start"], '%d/%m/%Y')
    # Date of when we stop looking for Events (after a week by default)
    query_end = query_start + timedelta(days=7)
    if request.GET.get("end"):
        query_end = date.strptime(request.GET["end"], '%d/%m/%Y')

    events = Event.objects.filter(
        start__gt=datetime.combine(query_start, time.min),
        end__lt=datetime.combine(query_end, time.min)
    )

    data = {
        "events":[]
    }
    # Load events in return data
    for event in events:
        data["events"].append(event.format())
    return HttpResponse(json.dumps(data), content_type='application/json')


def create_event(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body.decode('utf-8'))
        except:
            return HttpResponse(status=400)
        Event(
            start=datetime.strptime(body["start"], '%Y-%m-%dT%H:%M'),
            end=datetime.strptime(body["end"], '%Y-%m-%dT%H:%M'),
            name=body["name"],
            description=body["description"]
        ).save()
        return HttpResponse(status=200)
    return HttpResponse(status=405)
