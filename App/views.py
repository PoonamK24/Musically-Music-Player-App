from django.shortcuts import render, redirect
from . models import Song,Artist,User
from json import dumps
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from .forms import UserForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse,HttpResponseBadRequest,HttpResponse
import json,random

def index(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"index.html",context)

def userlogin(request):
    if(request.user.is_authenticated):
        messages.warning(request, 'You are already logged in')

    else:

        if(request.method == "POST"):
            uname = request.POST["uname"]
            password = request.POST["pwd"]
            user = authenticate(request,username=uname,password=password)
            
            if user is not None:
                login(request,user)  
                return redirect('/')
                messages.success(request, 'Logged in successfully')
            else:
                return redirect(userlogin)
                messages.error(request, 'Invalid Username or Password')
        return render(request,'login.html', {})
    
def signup(request):
    form = UserForm()
    if(request.method == "POST"):
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('userlogin')
            messages.success(request, 'Registered Successfully,Login to continue')
        else:
            messages.error(request, 'Invalid Credentials')
    return render(request, 'register.html', {'form':form})


def userlogout(request):
    if(request.user.is_authenticated):
        logout(request)
        messages.success(request, 'Logged out successfully')
    return redirect('/userlogin')


def viewbyartist(request,aname):
    try:
        songs = Song.objects.filter(artist__name= aname)
        artist = Artist.objects.filter(name = aname).first()
        artists = Artist.objects.all()
        context={"songs":songs,'artist':artist,'artists':artists}
        return render(request,"artist.html",context)
    except:
        messages.warning(request,'Artist not found')
        return redirect(index)
    
def viewbysong(request,sname):
    try:
        song = Song.objects.get(title= sname)
        context={"song":song}
        return render(request,"viewbysong.html",context)
    except:
        messages.warning(request,'Song not found')
        return redirect(index)

def newReleases(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"newReleases.html",context)

def topplaylists(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"topplaylists.html",context)

def topartist(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"topartist.html",context)

def topcharts(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"topcharts.html",context)

@login_required(login_url='/userlogin')
def favsongs(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"favsongs.html",context)

@login_required(login_url='/userlogin')
def recentlylistened(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"recentlylistened.html",context)

@login_required(login_url='/userlogin')
def myalbum(request):
    songs = Song.objects.all()
    artists = Artist.objects.all()
    context={"songs":songs,'artists':artists}
    return render(request,"myalbum.html",context)

def songlist(request):
    songs = Song.objects.filter.values_list('title')
    songlist = list(songs)
    return JsonResponse(songlist,safe=False)

def searchsong(request):
    if (request.method == 'POST'):
        searchedsong = request.POST.get('searchsong')
        if(searchedsong == ""):
            return redirect(request.META.get('HTTP_REFERER'))
            
        else: 
            song = Song.objects.filter(title = searchedsong).first() 

            if(song):
                return redirect('/viewbysong'+'/'+ str(song.title))
            else:
                messages.info(request, 'Song Not Found')
                return redirect(request.META.get('HTTP_REFERER'))

    return redirect(request.META.get('HTTP_REFERER'))