from .models import Profile
from .serializer import ProfileSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET','POST'])
def listProfiles(request):
    if request.method == 'GET':
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    else: # POST
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def profileDetails(request, pk):
    profile = Profile.objects.get(id=pk)
    if request.method == 'GET':
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProfileSerializer(instance=profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else: # DELETE
        profile.delete()
        return Response({"message": f"The Profile with id={profile.id} was deleted successfully"}, status=status.HTTP_200_OK)