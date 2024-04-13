from a_users.models import Profile
from a_products.models import Product
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


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def listOrderProducts(request):
    # profile = Profile.objects.get(user=request.user)
    profile = request.user.profile
    order, _ = Order.objects.get_or_create(profile=profile, complete=False)
    if not order.complete:
        if request.method == 'GET':
            order_products = order.products.all()
            serializer = OrderProductSerializer(order_products, many=True)
            return Response(serializer.data)
        elif request.method == 'POST': # POST
            data = request.data
            productId = data['productId']
            product = Product.objects.get(id=productId)
            newOrderProduct, _ = OrderProduct.objects.get_or_create(order=order, product=product)
            newOrderProduct.save()

            return Response({'message': f"'{product.title}' added to the cart successfully!"}, status=status.HTTP_201_CREATED)

            # serializer = OrderProductSerializer(data=request.data)
            # if serializer.is_valid():
            #     serializer.save()
            #     return Response(serializer.data, status=status.HTTP_201_CREATED)
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else: # DELETE
            message = f"The cart has been cleared succesfully!"
            order.delete()
            return Response({'message': message}, status=status.HTTP_200_OK)
    else:
        pass


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def OrderProductDetails(request, pk):
    profile = request.user.profile
    order = Order.objects.get(profile=profile, complete=False)
    product = Product.objects.get(id=pk)
    order_product = OrderProduct.objects.get(order=order, product=product)

    if request.method == 'GET':
        serializer = OrderProductSerializer(order_product, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        print('---------------------------')
        print(request.data)
        newQuantity = request.data['quantity']
        order_product.quantity = newQuantity
        order_product.save()
        return Response(status=status.HTTP_200_OK)
    else: # DELETE
        message = f"The product: '{product.title}' was successfully deleted from the cart!"
        order_product.delete()
        return Response({'message': message}, status=status.HTTP_200_OK)

