from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser
import re
from django.conf import settings
from django.db import models, transaction
from django.contrib.auth.tokens import default_token_generator

token_generator = default_token_generator

SHA1_RE = re.compile('^[a-f0-9]{40}$')


class Event(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    date = models.DateField()
    organizer = models.ForeignKey(User, related_name='own_events', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'events'


class Participant(models.Model):
    user = models.ForeignKey(User, related_name='events', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='participants', on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name_plural = 'participants'

    def __str__(self):
        return self.user.username

#
# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_information')
#     photo = models.ImageField(upload_to='profile_images', blank=True)
#
#     def __str__(self):
#         return self.user.username


class UserProfileRegistrationManager(models.Manager):
    """
    Custom manager for ``UserProfile`` model.
    The methods defined here provide shortcuts for user profile creation
    and activation (including generation and emailing of activation
    keys), and for cleaning out expired inactive accounts.
    """

    @transaction.atomic
    def create_user_profile(self, data, is_active=False):
        """
        Create a new user and its associated ``UserProfile``.
        Also, send user account activation (verification) email.
        """

        password = data.pop('password')
        user = User(**data)
        user.set_password(password)
        user.save()

        return user

    def create_profile(self, user):
        """
        Create UserProfile for give user.
        Returns created user profile on success.
        """
        profile = self.create(
            user=user
        )

        return profile


class UserProfile(models.Model):
    """
    A model for user profile that also stores verification key.
    Any methods under User will reside here.
    """

    ACTIVATED = "ALREADY ACTIVATED"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
    )

    objects = UserProfileRegistrationManager()

    class Meta:
        verbose_name = u'user profile'
        verbose_name_plural = u'user profiles'

    def __str__(self):
        return str(self.user)

