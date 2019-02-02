from django.shortcuts import render
from django.http import JsonResponse
from .models import ProductInBasket

def basket_adding(request):
    return_dict = dict()
    session_key = request.session.session_key
    print(request.POST)
    data = request.POST
    product_id = data.get("product_id")
    nmb = data.get("nmb")
    print(session_key)
    is_delete = data.get("is_delete")

    if(is_delete):
        ProductInBasket.objects.filter(id=product_id).update(is_active=False)
    else:
        new_product, created = ProductInBasket.objects.get_or_create(session_key=session_key, is_active=True, product_id=product_id,
                                                                     defaults={"nmb": nmb})
        if not created:
            new_product.nmb += int(nmb)
            new_product.save(force_update=True)

    products_in_baskets = ProductInBasket.objects.filter(session_key=session_key, is_active=True)
    products_total_nmb = products_in_baskets.count()
    return_dict["products_total_nmb"] = products_total_nmb

    return_dict['products'] = list()

    for item in products_in_baskets:
        product_dict = dict()
        product_dict["id"] = item.id
        product_dict["name"] = item.product.name
        product_dict["price"] = item.price_pre_item
        product_dict["nmb"] = item.nmb
        return_dict["products"].append(product_dict)

    return JsonResponse(return_dict)
