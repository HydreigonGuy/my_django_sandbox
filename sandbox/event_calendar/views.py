from django.shortcuts import render
from django.http import HttpResponse
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
    # Change date format to datetime format
    query_start = datetime.combine(query_start, time.min)
    query_end = datetime.combine(query_end, time.min)

    events = Event.objects.filter(
        start__gt=query_start,
        end__lt=query_end
    )

    data = {
        "events":[],
        "start":query_start.strftime("%Y-%m-%d"),
        "end":query_end.strftime("%Y-%m-%d")
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
