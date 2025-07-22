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

- **Home page**
    - View all the products.
    - Be able to filter by categories.
    - Be able to filter by search.
    - Be able to filter by date and price range.
    - Be able to sort by price or date.
    - When changing the size of the window, the site should still look okay.
    - Ability to add products to cart.


- **Navbar**
    - Name and logo of your shop – return to home screen.
    - Cart icon displaying how many products are selected – cart page.
    - The navbar needs to be displayed all the time.


- **Product page - /product/{id}**
    - Show image and the data about the products.
    - Ability to add/remove product to the cart with amount – if already exists/doesn't exists show corresponding message to the client.
    - Error page if the product id doesn't exist.

- **Cart page - /cart**
    - Show all the products in the cart.
    - Ability to remove products from the cart.
    - Change the amount of any product.
    - Show total cart value.
    - Button to submit the order.

###  Entities
-	**Product**
    -	Name
    -	Uploaded date
    -	Description
    -	Price
    -	Seller name
    -	Image url
    -	Category – home/sport/clothing/etc…
    -	Additional info according to the product, Examples: 
Phones – CPU/camera, Clothes – colors/brand/size

-	**Category**
    -	Name

-	**Order**
    -	Order date
    -	Products

!!! Note "Important Notes"
    -	The data will be loaded from a mock file. (You can use [this website](https://www.mockaroo.com/) for mocks)
    -	Check with the team about our standards to react programming.
    -	Use only functional components.
    -	Use flex box.
    -	Use Context to manage your state.
    -	Responsive.
    -	Don't forget to use git and save the code in a remote repository.
    -   Write at least 6 tests for at least 2 components.


## Knowledge questions
-	What is React Router and why is it useful in a React application?
-	What are the differences between functional and class components in React, and why should you use only functional components?
-	What is useContext and how does it help manage state in a React application?
-	What causes components to rerender?
-	What is useLayout?
-	What is useMemo?
-	What is DOM?

## Reference images

![Main page](/assets/images/OptimusTraining/Ecommerce/productsPage.png)
![Main page](/assets/images/OptimusTraining/Ecommerce/productsPageTwo.png)
![Product page](/assets/images/OptimusTraining/Ecommerce/productPage.png)
![Product page](/assets/images/OptimusTraining/Ecommerce/productPageTwo.png)
![Cart](/assets/images/OptimusTraining/Ecommerce/cart.png)

