---
date: 2025-02-20
title: "Third project - Ecommerce"
weight: 6
---

# Ecommerce

---

In this project you will learn how to use react router, redux and scss, while combining everything you learned so far.

## Exercise requirements

### Pages

- **Home page**- 
  - View all the products.- **Done**
  - Be able to sort by price. **Done**
  - Be able to sort by date- **Done**
  - Be able to filter by categories.**Done**
  - Be able to filter by search.-**Done**
  - Be able to filter by date .-**Done**
  - Be able to filter  price range.- **Done**
  - When changing the size of the window, the site should still look okay.-**done**
  - Ability to add products to cart. -**done**
  - Filtering, Your goal is to make the filter as much as simple as you can, so for example the inputs should be onChange listener and not have a button on each of them, when a filter resets - it should reset and show all the products by default, use .lower on the serachTerm, and trim to make it more easy to search. The filters should be clean and easy to use-**done**

  - desinged-**Done**



- **Product page - /product/{id}**


  - the data about the products. -**Done**
  - Error page if the product id doesn't exist.-**Done**
  - Ability to add/remove product to the cart with amount –**Done**
  - Ability to change product cart with amount-**Done**
  - Show image and - **Done**

  -if already exists/doesn't exists show corresponding message to the client.-**Done**
  -desinged-**Done**
    


- **Cart page - /cart**-
  - Show all the products in the cart.- **Done**
  - Ability to remove products from the cart.- **Done**
  - Show total cart value.- **Done**
  - Button to submit the order.- **Done**
  - Change the amount of any product.-**Done**
  - desinged-**Done**





---------------------------------------------------
- **Navbar**- **done**
  - Name – return to home screen. **done**
  - logo of your shop – return to home screen. **done**
  - Cart icon displaying how many products are selected – cart page.- **done**
  - The navbar needs to be displayed all the time.-**done**


function:
-useProductControllerFindProduct
-useProductControllerGetAllProduct
-useProductControllerIsExist
-useProductControllerUpdatePrice
-useProductControllerUpdateByStatus
-useOrderControllerGetAllOrders
-useOrderControllerAddNew
-useOrderControllerRemove
-useOrderControllerUpdateProductOrderAmount
-useOrderControllerGetOrdersWithProductsAndCategories

