from django.contrib.sites.shortcuts import get_current_site
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models import Q
from rest_framework.authtoken.models import Token


class SimpleEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'date', 'organizer']


class SimpleUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class SimpleParticipantUserSerializer(serializers.HyperlinkedModelSerializer):
    user = SimpleUserSerializer(read_only=True)

    class Meta:
        model = Participant
        fields = ['user']


class SimpleParticipantEventSerializer(serializers.HyperlinkedModelSerializer):
    event = SimpleEventSerializer(read_only=True)

    class Meta:
        model = Participant
        fields = ['event']


class EventSerializer(serializers.HyperlinkedModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
        allow_null=True,
        default=None,
        many=True
    )

    organizer = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
        allow_null=True,
        default=None
    )

    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'date', 'organizer', 'participants']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    events = SimpleParticipantEventSerializer(many=True, read_only=True)
    own_events = SimpleEventSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'own_events', 'events']


class UserRegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        label="Email Address"
    )

    password = serializers.CharField(
        required=True,
        label="Password",
        style={'input_type': 'password'}
    )

    password_2 = serializers.CharField(
        required=True,
        label="Confirm Password",
        style={'input_type': 'password'}
    )

    class Meta(object):
        model = User
        fields = ['username', 'email', 'password', 'password_2', ]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate_password(self, value):
        if len(value) < getattr(settings, 'PASSWORD_MIN_LENGTH', 8):
            raise serializers.ValidationError(
                "Password should be at least %s characters long." % getattr(settings, 'PASSWORD_MIN_LENGTH', 8)
            )
        return value

    def validate_password_2(self, value):
        data = self.get_initial()
        password = data.get('password')
        if password != value:
            raise serializers.ValidationError("Passwords doesn't match.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def create(self, validated_data):
        team = getattr(self, 'team', None)

        user_data = {
            'username': validated_data.get('username'),
            'email': validated_data.get('email'),
            'password': validated_data.get('password'),
        }
        user = UserProfile.objects.create_user_profile(
            data=user_data
        )

        return validated_data


class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=False,
        allow_blank=True,
        write_only=True,
    )

    token = serializers.CharField(
        allow_blank=True,
        read_only=True
    )

    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta(object):
        model = User
        fields = [ 'username', 'password', 'token']

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        if not username:
            raise serializers.ValidationError("Please enter username to login.")

        user = User.objects.filter(
           Q(username=username)
        ).distinct()

        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise serializers.ValidationError("This username is not valid.")

        if user_obj:
            if not user_obj.check_password(password):
                raise serializers.ValidationError("Invalid credentials.")

        if user_obj.is_active:
            token, created = Token.objects.get_or_create(user=user_obj)
            data['token'] = token
        else:
            raise serializers.ValidationError("User not active.")

        return data


# class UserSerializerRegistration(serializers.ModelSerializer):
#     email = serializers.EmailField(
#             required=True,
#             validators=[UniqueValidator(queryset=User.objects.all())]
#             )
#     username = serializers.CharField(
#         max_length=32,
#         validators=[UniqueValidator(queryset=User.objects.all())]
#     )
#     password = serializers.CharField(min_length=8, write_only=True)
#
#     def create(self, validated_data):
#         user = User.objects.create_user(validated_data['username'], validated_data['email'],
#              validated_data['password'])
#         return user
#
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'password')