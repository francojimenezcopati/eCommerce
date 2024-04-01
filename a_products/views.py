from .models import Product
from .serializer import ProductSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def listProducts(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else: # POST
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() # guarda el producto que vino del front desde request.data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def productDetails(request, pk):
    product = Product.objects.get(id=pk)
    if request.method == 'GET':
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else: # DELETE
        product.delete()
        return Response({"message": f"The Product with id={product.id} was deleted successfully"}, status=status.HTTP_200_OK)