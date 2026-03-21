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
            "start":self.start.strftime("%Y-%m-%d %H:%M"),
            "end":self.end.strftime("%Y-%m-%d %H:%M"),
            "name":self.name,
            "description":self.description
        }
