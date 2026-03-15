from django.db import models

class NothingButtonState(models.Model):
    status = models.BooleanField()

    def activate(self):
        self.status = True
        self.save()

    def deactivate(self):
        self.status = False
        self.save()
