from django.db import models


class Event(models.Model):
    start = models.DateTimeField()
    end = models.DateTimeField()
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=2000)

    def move(self, start=None, end=None):
        if start:
            self.start = start
        if end:
            self.end = end
        self.save()

    def format(self):
        return {
            "start_day":self.start.strftime("%Y-%m-%d"),
            "end_day":self.end.strftime("%Y-%m-%d"),
            "start_time":self.start.strftime("%H:%M"),
            "end_time":self.end.strftime("%H:%M"),
            "name":self.name,
            "description":self.description
        }
