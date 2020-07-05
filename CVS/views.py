import json
from django.core import serializers
from django.core.paginator import Paginator
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, DetailView, ListView, TemplateView, UpdateView, DeleteView
from django.views.generic.detail import SingleObjectMixin

#Forms and models
from .models import Set, Img, Note
from .forms import SetCreateForm, ImgCreateForm, NoteCreateForm

# Create your views here.
@login_required(login_url="login")
def index(request):
    return render(request,'Blocks/CVS/index.html')

class SetCreateView(CreateView):
    form_class = SetCreateForm
    template_name = 'Blocks/CVS/micro/set_form.html'
    # success_url = reverse_lazy('set_list')

    def get_success_url(self):
        set_id = self.object.id
        print(set_id)
        return reverse('add-img', args=[set_id])

    def form_valid(self, form):
        form.instance.author_id = self.request.user.id
        return super().form_valid(form)


class SetListView(ListView):
    model = Set
    template_name = 'Blocks/CVS/micro/index.html'

    def get_queryset(self):
        qs = Set.objects.all().filter(author=self.request.user)
        return qs


class SetDetailView(DetailView):
    model = Set
    template_name = 'Blocks/CVS/micro/set.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        images = self.object.images.all()
        #all_notes = serializers.serialize('json', Note.objects.all())
        images_json = serializers.serialize('json', images)
        paginator = Paginator(images, 1)
        page_number = self.request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context['page_obj'] = page_obj
        context['images_json'] = images_json
        #context['all_notes'] = all_notes
        return context


# view to add note to image
# class AddNoteView(TemplateView, SingleObjectMixin):
#     template_name = 'Blocks/CVS/micro/add_note.html'
#     model = Img
#
#     def get_queryset(self):
#         qs = Img.objects.get(id=self.kwargs.get('img_id'))
#         return qs
#
#     def get(self, request, *args, **kwargs):
#         note_form = NoteCreateForm()
#
#         return render(request, self.template_name, {'note_form': note_form, 'img': self.get_queryset()})
#
#     def post(self, request, *args, **kwargs):
#         note_form = NoteCreateForm(request.POST)
#         # set_obj = get_object_or_404(Set, id=self.kwargs.get('set_id'))
#         img_obj = get_object_or_404(Img, id=self.kwargs.get('img_id'))
#         if note_form.is_valid():
#             note_obj = note_form.save()
#             img_obj.notes.add(note_obj)
#             img_obj.save()
#             return redirect('set_list')
#         else:
#             return render(request, self.template_name, {'note_form':note_form})
#
#
# # view that updates a note
# class UpdateNoteView(UpdateView):
#     model = Note
#     template_name = 'Blocks/CVS/micro/note_form.html'
#     form_class = NoteCreateForm
#
#     def get_success_url(self):
#         note = self.object
#         img = note.image_notes.all().first()
#         set = img.set_imgs.all().first()
#         return reverse('set_det', args=[set.id])
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         note = self.object
#         img = note.image_notes.all().first()
#         print(img)
#         context['img'] = img
#         return context


# view with images with note on it
class ImgDetailView(DetailView):
    model = Img
    template_name = 'Blocks/CVS/micro/img_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        notes = Note.objects.filter(image_notes=self.object)
        dic = {}
        dic_list = []
        # Note json is created
        for obj in notes:
            dic['type'] = 'text'
            dic['title'] = obj.title
            dic['description'] = obj.note
            dic['position'] = {}
            dic['position']['left'] = obj.x_dim
            dic['position']['top'] = obj.y_dim
            dic['link'] = {}
            dic['link']['url'] = reverse('note_update', args=[obj.id])
            dic['link']['label'] = 'update'

            dic_list.append(dic)

        # print(dic_list)
        context['notes'] = json.dumps(dic_list)
        return context


# view to add an image to set
class ImgAddView(TemplateView):
    template_name = 'Blocks/CVS/micro/img_add.html'

    def get(self, request, *args, **kwargs):
        img_form = ImgCreateForm()
        return render(request, self.template_name, {'img_form': img_form})

    def post(self, request, *args, **kwargs):
        img_form = ImgCreateForm(request.POST)
        set_obj = get_object_or_404(Set, id=self.kwargs.get('set_id'))

        if img_form.is_valid():
            img_obj = img_form.save(commit=False)
            if 'image' in request.FILES:
                img_obj.image = request.FILES['image']
                img_obj.save()

            # img_obj.notes.add(note_obj)
            set_obj.images.add(img_obj)
            print(self.kwargs.get('set_id'))
            return redirect('set_det', pk=self.kwargs.get('set_id'))
        else:
            return render(request, self.template_name, {'img_form': img_form})


class ImgCreatView(CreateView):
    form_class = ImgCreateForm
    template_name = 'Blocks/CVS/micro/img_form.html'


class UpdateImgView(UpdateView):
    form_class = ImgCreateForm
    template_name = 'Blocks/CVS/micro/img_form.html'
    model = Img

    def get_success_url(self):
        return reverse('img_det', args=[self.kwargs.get('pk')])


# class NoteCreateView(CreateView):
#     form_class = NoteCreateForm
#     template_name = 'Blocks/CVS/micro/note_form.html'


class SetDelete(DeleteView):
    model = Set
    success_url = reverse_lazy('set_list')
    template_name = 'Blocks/CVS/micro/confirm_delete.html'


class ImgDelete(DeleteView):
    model = Img
    success_url = reverse_lazy('set_list')
    template_name = 'Blocks/CVS/micro/confirm_delete.html'


# class NoteDelete(DeleteView):
#     model = Note
#     success_url = reverse_lazy('set_list')
#     template_name = 'Blocks/CVS/micro/confirm_delete.html'


























































# #Set
# class SetListView(ListView):
#     model = Set
#     template_name = 'Blocks/CVS/micro/index.html'
#
#     def get_queryset(self):
#         qs = Set.objects.all().filter(author=self.request.user)
#         return qs
#
# class SetCreateView(CreateView):
#     form_class = SetCreateForm
#     template_name = 'Blocks/CVS/micro/new.html'
#
#     def get_success_url(self):
#         set_id = self.object.id
#         print(set_id)
#         return reverse('add-img', args=[set_id])
#
#     def form_valid(self, form):
#         form.instance.author_id = self.request.user.id
#         return super().form_valid(form)
#
#
# class SetDetailView(DetailView):
#     model = Set
#     template_name = 'Blocks/CVS/micro/show.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         images = self.object.images.all()
#         all_notes = serializers.serialize('json', Note.objects.all())
#         images_json = serializers.serialize('json', images)
#         paginator = Paginator(images, 1)
#         page_number = self.request.GET.get('page')
#         page_obj = paginator.get_page(page_number)
#         context['page_obj'] = page_obj
#         context['images_json'] = images_json
#         context['all_notes'] = all_notes
#         return context
#
# class SetDelete(DeleteView):
#     model = Set
#     success_url = reverse_lazy('set_list')
#     template_name = 'Blocks/CVS/micro/confirm_delete.html'
#
#
#
#
# #Images
# class ImgAddView(TemplateView):
#     template_name = 'Blocks/CVS/micro/img_add.html'
#
#     def get(self, request, *args, **kwargs):
#         img_form = ImgCreateForm()
#         note_form = NoteCreateForm()
#         return render(request, self.template_name, {'img_form': img_form, 'note_form':note_form})
#
#     def post(self, request, *args, **kwargs):
#         img_form = ImgCreateForm(request.POST)
#         note_form = NoteCreateForm(request.POST)
#         set_obj = get_object_or_404(Set, id=self.kwargs.get('set_id'))
#
#         if note_form.is_valid():
#             note_obj = note_form.save()
#             if img_form.is_valid():
#                 img_obj = img_form.save(commit=False)
#                 if 'image' in request.FILES:
#                     img_obj.image = request.FILES['image']
#                     img_obj.save()
#
#                 img_obj.notes.add(note_obj)
#                 set_obj.images.add(img_obj)
#                 print(self.kwargs.get('set_id'))
#                 return redirect('set_det', pk=self.kwargs.get('set_id'))
#         else:
#             return render(request, self.template_name, {'img_form': img_form, 'note_form':note_form})
#
# class ImgCreateView(CreateView):
#     form_class = ImgCreateForm
#     template_name = 'Blocks/CVS/micro/img_form.html'
#
# class ImgDetailView(DetailView):
#     model = Img
#     template_name = 'imark/img_detail.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         notes = Note.objects.filter(image_notes=self.object)
#         dic = {}
#         dic_list = []
#         # Note json is created
#         for obj in notes:
#             dic['type'] = 'text'
#             dic['title'] = obj.title
#             dic['description'] = obj.note
#             dic['position'] = {}
#             dic['position']['left'] = obj.x_dim
#             dic['position']['top'] = obj.y_dim
#             dic['link'] = {}
#             dic['link']['url'] = reverse('note_update', args=[obj.id])
#             dic['link']['label'] = 'update'
#
#             dic_list.append(dic)
#
#         # print(dic_list)
#         context['notes'] = json.dumps(dic_list)
#         return context
#
# class UpdateImgView(UpdateView):
#     form_class = ImgCreateForm
#     template_name = 'Blocks/CVS/micro/img_form.html'
#     model = Img
#
#     def get_success_url(self):
#         return reverse('img_det', args=[self.kwargs.get('pk')])
#
# class ImgDelete(DeleteView):
#     model = Img
#     success_url = reverse_lazy('set_list')
#     template_name = 'Blocks/CVS/micro/confirm_delete.html'
#
#
#
#
# # Notes
# class AddNoteView(TemplateView, SingleObjectMixin):
#     template_name = 'Blocks/CVS/micro/add-note.html'
#     model = Img
#
#     def get_queryset(self):
#         qs = Img.objects.get(id=self.kwargs.get('img_id'))
#         return qs
#
#     def get(self, request, *args, **kwargs):
#         note_form = NoteCreateForm()
#
#         return render(request, self.template_name, {'note_form': note_form, 'img': self.get_queryset()})
#
#     def post(self, request, *args, **kwargs):
#         note_form = NoteCreateForm(request.POST)
#         # set_obj = get_object_or_404(Set, id=self.kwargs.get('set_id'))
#         img_obj = get_object_or_404(Img, id=self.kwargs.get('img_id'))
#         if note_form.is_valid():
#             note_obj = note_form.save()
#             img_obj.notes.add(note_obj)
#             img_obj.save()
#             return redirect('set_list')
#         else:
#             return render(request, self.template_name, {'note_form':note_form})
#
# class UpdateNoteView(UpdateView):
#     model = Note
#     template_name = 'Blocks/CVS/micro/note_form.html'
#     form_class = NoteCreateForm
#
#     def get_success_url(self):
#         note = self.object
#         img = note.image_notes.all().first()
#         set = img.set_imgs.all().first()
#         return reverse('set_det', args=[set.id])
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         note = self.object
#         img = note.image_notes.all().first()
#         print(img)
#         context['img'] = img
#         return context
#
# class NoteCreateView(CreateView):
#     form_class = NoteCreateForm
#     template_name = 'Blocks/CVS/micro/note_form.html'
#
# class NoteDelete(DeleteView):
#     model = Note
#     success_url = reverse_lazy('set_list')
#     template_name = 'Blocks/CVS/micro/confirm_delete.html'











# @login_required(login_url="login")
# def micro(request):
#     shelf = Set.objects.all()
#     return render(request,'Blocks/CVS/micro/index.html', {'shelf': shelf})

# @login_required(login_url="login")
# def upload(request):
#     upload = SetCreate()
#     if request.method == 'POST':
#         upload = SetCreate(request.POST, request.FILES)
#         if upload.is_valid():
#             set_obj = upload.save(commit = False)
#             set_obj.author = request.user
#             set_obj.save()
#             return redirect('micro')
#         else:
#             return HttpResponse("""your form is wrong, reload on <a href = "{{ url : 'micro'}}">reload</a>""")
#     else:
#         return render(request, 'Blocks/CVS/micro/new.html', {'upload_form':upload})
#
# @login_required
# def micro_update(request, set_id):
#     set_id = int(set_id)
#     try:
#         set_self = Set.objects.get(id = set_id)
#     except Set.DoesNotExist:
#         return redirect('micro')
#     set_form = SetCreate(request.POST or None, instance = set_self)
#     if set_form.is_valid():
#        set_form.save()
#        return redirect('micro')
#     return render(request, 'Blocks/CVS/micro/new.html', {'upload_form':set_form})
#
# @login_required
# def micro_delete(request, set_id):
#     set_id = int(set_id)
#     try:
#         set_self = Set.objects.get(id = set_id)
#     except Set.DoesNotExist:
#         return redirect('micro')
#     set_self.delete()
#     return redirect('micro')
#
# def micro_show(request, set_id):
#     try:
#         set = Set.objects.get(pk=set_id)
#     except Set.DoesNotExist:
#         raise Http404("Set does not exist")
#     return render(request, 'Blocks/CVS/micro/show.html', {'set': set})
