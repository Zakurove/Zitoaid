from rest_framework import serializers
from .models import Lead, RespMicro, RespMicroImage
import logging
import sys
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

# class RespMicroSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RespMicro
#         fields = '__all__'
    # url = serializers.HyperlinkedIdentityField(view_name='respMicro-detail',)
class RespMicroImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespMicroImage
        fields = ('image',)
class RespMicroSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='respMicro-detail',)
    user = serializers.ReadOnlyField(source='user.username')
    images = RespMicroImageSerializer(source='respMicroimage_set', many=True, read_only=True)
    class Meta:
        model = RespMicro
        fields = '__all__'

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        # print(images_data)
        print(images_data.get())
        respMicro = RespMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description') )
        for image_data in images_data.values():
            print(type(image_data))
            RespMicroImage.objects.create(respMicro=respMicro, image=image_data)
        return respMicro





# class RespMicroSerializer(serializers.HyperlinkedModelSerializer):
#     url = serializers.HyperlinkedIdentityField(view_name='respMicro-detail',)
#     user = serializers.ReadOnlyField(source='user.username')
#     class Meta:
#         model = RespMicro
#         fields = '__all__'
#
#     def create(self, validated_data):
#         images_data = self.context.get('view').request.FILES
#         # print(images_data)
#         print(images_data.values())
#         RespMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), images=images_data)








# class RespMicroSerializer(serializers.ModelSerializer):
#     image = serializers.ListField(write_only=True,child=serializers.FileField(max_length=10000000, allow_empty_file=True,)
#     class Meta:
#         model = RespMicro
#         fields = '__all__'

    # def is_valid(self, raise_exception=False):
    #         if len(set.getlist('media')) > 5:
    #              raise 'some error'
