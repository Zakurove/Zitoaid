from django.urls import path
from . import views
from Tawassam.settings import DEBUG, STATIC_URL,  MEDIA_URL, MEDIA_ROOT
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name="index"),

    #Cardio_micro
    # path('Microbiology/', views.micro, name="micro"),
    # path('Microbiology/<int:set_id>', views.micro_show, name="micro_show"),
    # path('Microbiology/upload', views.upload, name="micro_upload"),
    # path('Microbiology/<int:set_id>/update/', views.micro_update, name="micro_update"),
    # path('Microbiology/<int:set_id>/delete/', views.micro_delete, name="micro_delete"),
    #Updated

    #Set
    path('Microbiology/sets', views.SetListView.as_view(), name='set_list'),
    path('Microbiology/create/set/', views.SetCreateView.as_view(), name='set_create'),
    path('Microbiology/set/<int:pk>', views.SetDetailView.as_view(), name='set_det'),
    path('Microbiology/set-delete/<int:pk>', views.SetDelete.as_view(), name='set_delete'),

    #image
    path('Microbiology/add-slide/<int:set_id>', views.ImgAddView.as_view(), name='add-img'),
    path('Microbiology/create/img/', views.ImgCreatView.as_view(), name='img_create'),
    path('img-detail/<int:pk>', views.ImgDetailView.as_view(), name='img_det'),
    path('Microbiology/img-update/<int:pk>', views.UpdateImgView.as_view(), name='img_update'),
    path('Microbiology/img-delete/<int:pk>', views.ImgDelete.as_view(), name='img_delete'),

    #Notes
    # path('Microbiology/add-note/<int:set_id>/<int:img_id>', views.AddNoteView.as_view(), name='add_note'),
    # path('Microbiology/create/note/', views.NoteCreateView.as_view(), name='note_create'),
    # path('Microbiology/note-update/<int:pk>', views.UpdateNoteView.as_view(), name='note_update'),
    # path('Microbiology/note-delete/<int:pk>', views.NoteDelete.as_view(), name='note_delete'),
]

#DataFlair
if DEBUG:
    # urlpatterns += static(STATIC_URL, document_root = STATIC_ROOT)
    urlpatterns += static(MEDIA_URL, document_root = MEDIA_ROOT)
