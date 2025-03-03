from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Transaction(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='transactions')
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=[(
        'Deposit', 'Deposit'), ('Withdrawal', 'Withdrawal')])
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner} - {self.amount} - {self.title} - timestamp: {self.timestamp}"
