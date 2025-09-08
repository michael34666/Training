-RETURN ALL THE ORDERS WITH PRODUCTS WITH THIR CATEGORIES
Get http://localhost:3000/orders/with-products-and-category

-return orders by category

-insert order,check if ids exist-**done**
Post http://localhost:3000/orders/
{
    "uploadDate": "03/11/2024",
    "products": [{
        "id": 8,
        "amount": 15
    },{
        "id": 9,
        "amount": 1005
    },  {
        "id": 4,
        "amount": 15
    }]
   
}
-edit amount of product in order-**done**
Patch http://localhost:3000/orders/:id/change-amount
{
    "changeAmount":3
}
-delete order-**done**
Delete http://localhost:3000/orders/:id