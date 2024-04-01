from a_users.models import Profile
from .models import Order, OrderProduct
from .serializer import OrderProductSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def getEndPoints(request):
    endpoints_urls = [
        'http://127.0.0.1:8000/api/orders/products/',
        'http://127.0.0.1:8000/api/products/',
        'http://127.0.0.1:8000/api/profiles/',
        'http://127.0.0.1:8000/api/token/',
        'http://127.0.0.1:8000/api/token/refresh/',
        'http://127.0.0.1:8000/admin/',
    ]
    return Response(endpoints_urls)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listOrderProducts(request):
    profile = Profile.objects.get(user=request.user)
    order, _ = Order.objects.get_or_create(profile=profile)
    if not order.complete:
        if request.method == 'GET':
            order_products = order.products.all()
            serializer = OrderProductSerializer(order_products, many=True)
            return Response(serializer.data)
        else: # POST
            serializer = OrderProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        pass


@api_view(['GET', 'PUT', 'DELETE'])
def OrderProductDetails(request, pk):
    order_product = OrderProduct.objects.get(id=pk)
    if request.method == 'GET':
        serializer = OrderProductSerializer(order_product, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = OrderProductSerializer(instance=order_product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else: # DELETE
        order_product.delete()
        return Response({"message": f"The OrderProduct with id={order_product.id} was deleted successfully"}, status=status.HTTP_200_OK)


# {
#     "order": {
#         "id": "1",
#         "complete": "false",
#         "created_at": "2024-02-27T22:27:41.665540Z",
#         "profile": "1"
#     },
#     "product": {
#         "id": "6",
#         "title": "test product",
#         "description": "aaaaa",
#         "price": "10.000",
#         "available_stock": "300",
#         "images_url": "",
#         "created": "2024-02-28T22:14:39.231396Z"
#     },
#     "quantity": "7"
# }
