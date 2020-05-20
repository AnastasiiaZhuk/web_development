from django.http import Http404
from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Event, Participant
from .serializes import EventSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status, viewsets, permissions
from rest_framework.response import Response
from . import serializes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myapi.serializes import UserRegistrationSerializer, UserLoginSerializer
from django.contrib.auth.models import User

from django.views.decorators.csrf import ensure_csrf_cookie

def home(request):
    return render(request, "events/first_page.html")


class UserRegistrationAPIView(generics.CreateAPIView):
    """
    Endpoint for user registration.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()


class UserLoginAPIView(APIView):
    """
    Endpoint for user login. Returns authentication token on success.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class Event_List(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class Event_Detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


@csrf_exempt
@api_view(['GET', 'DELETE', 'PUT'])
def event_detail(request, name):
    try:
        event = Event.objects.get(name=name)
    except:
        return Response(status=404)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        event.delete()
        return Response(status=204)


class User_List(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class User_Detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


#
# @csrf_exempt
# def remove_event(request):
#     if request.method != 'POST':
#         raise Http404()
#     try:
#         event = Event.objects.get(id=int(request.POST['id']))
#     except KeyError:
#         return HttpResponseBadRequest('failed')
#     except ObjectDoesNotExist:
#         raise Http404()
#     if event.organizer != User.objects.get(username=request.user.get_username()):
#         return HttpResponseForbidden('access denied')
#     event.delete()
#     return HttpResponse('event ' + request.POST['id'] + ' removed')
#
# @api_view(['GET', 'POST'])
# def event_list(request, format=None):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         snippets = Event.objects.all()
#         serializer = EventSerializer(snippets, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = EventSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
