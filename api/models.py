from django.db import models
import secrets

def generate_unique_code():
    while True:
        code = secrets.token_hex(4)
        if Room.objects.filter(code=code).count()==0:
            break
    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, unique=True, default=generate_unique_code)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    guest_can_skip = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code+' - '+self.host
