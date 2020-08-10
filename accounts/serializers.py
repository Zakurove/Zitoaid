from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile
# from leads.models import RespMicro

#Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('role',)

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  profile = ProfileSerializer(required=True)

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'profile' )

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  profile = ProfileSerializer(required=False)

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password', 'profile')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    
    user = User.objects.create_user(username=validated_data.get('username', 'no-username'), email=validated_data.get('email', 'no-email'),password=validated_data.get('password', 'no-password'),)
    # user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'],)
    role = self.context.get('view').request.data.get('role')
    profile = Profile.objects.create(user=user, role= role)

    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")
