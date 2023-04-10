from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_view
from .forms import ResetPasswordForm, ChangePasswordForm

app_name = "App"

urlpatterns = [
    path("", views.index, name="index"),
    path('userlogin',views.userlogin,name='userlogin'),
    path('signup',views.signup,name='signup'),
    path('userlogout',views.userlogout,name='userlogout'),
    path("newReleases", views.newReleases, name="newReleases"),
    path("topcharts", views.topcharts, name="topcharts"),
    path("topplaylists", views.topplaylists, name="topplaylists"),
    path("topartist", views.topartist, name="topartist"),
    path("favsongs", views.favsongs, name="favsongs"),
    path("recentlylistened", views.recentlylistened, name="recentlylistened"),
    path("myalbum", views.myalbum, name="myalbum"),
    path("viewbyartist/<str:aname>", views.viewbyartist, name="viewbyartist"),
    path("viewbysong/<str:sname>", views.viewbysong, name="viewbysong"),
    path('songlist',views.songlist,name='songlist'),
    path('searchsong',views.searchsong,name='searchsong'),

    #authviews
    path('password-reset/',
        auth_view.PasswordResetView.as_view(
            template_name='password_reset.html',
            subject_template_name='password_reset_subject.txt',
            email_template_name='password_reset_email.html',
            # success_url='/login/'
            ),
            name='password_reset'),

    path('password-reset/done/',
        auth_view.PasswordResetDoneView.as_view(
            template_name='password_reset_done.html'
        ),
        name='password_reset_done'),

    path('password-reset-confirm/<uidb64>/<token>/',
        auth_view.PasswordResetConfirmView.as_view(
            template_name='/password_reset_confirm.html'
        ),
        name='password_reset_confirm'),

    path('password-reset-complete/',
        auth_view.PasswordResetCompleteView.as_view(
            template_name='password_reset_complete.html'
        ),
        name='password_reset_complete'),


    path('changepassword',auth_view.PasswordChangeView.as_view(template_name='changepassword.html',
    form_class=ChangePasswordForm,success_url='/passwordchangedone'),name='changepassword'),

    path('passwordchangedone',auth_view.PasswordChangeDoneView.as_view(template_name='passwordchangedone.html'),name='passwordchangedone')

]   
