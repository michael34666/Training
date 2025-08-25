---
date: 2025-02-20
title: "Third project - Ecommerce - Backend"
weight: 9
---

# Ecommerce - Backend

---

In this project part one you will learn the basic of Nestjs, Typeorm, Graphql.
This project is the backend of the ecommerce project.

## Pre-Reading material
1.	Nestjs
1.	Typeorm
1.	Graphql

## Exercise requirements

=== "Sod"
    Create database in postgres with

    - Products 
        - Id – PK (sequence)
        - Name
        - Upload_date 
        - Description
        - Price
        - Seller_name
        - Image_url
        - Status (information about it below) 
    - Category
        - Id – PK (sequence)
        - Name
    - Products_categories (many to many table – compound PK)  
        - Product_id - FK
        - Category_id - FK



## Initialize the DB
After creating the DB and all tables and meta data, populate the DB with: 

- At least 4 categories.-**Done**
- Products (all products with status 'ACTIVE' unless told otherwise): 
    - At least 1 product in each category-**Done**
    - At least 1 product with a 'DISABLED' status-**Done**
- Create server-side application with products service.
- Export the data with Graphql
    - Product_service
        - Queries:
            - Return all the active products with their categories.-GET http://localhost:3000/products/
            - Return products by ids.-get http://localhost:3000/products/{PRODUCTS_id}
            - Do products ids exist -get http://localhost:3000/products/{PRODUCTS_id}/is-exist
            - Return all categories -get(http://localhost:3000/categories)
        - Mutations:
            - Update product price :patch http://localhost:3000/products/{PRODUCTS_id}/change-price and in body:{"InPrice":1555411}
            - Delete product-delete http://localhost:3000/products/{PRODUCTS_id}
            - Update product to status disabled- patch http://localhost:3000/products/{PRODUCTS_id}/change-status


!!! Note "Important Notes"
    - Save environment variables in an .env file
    - Use nestjs config for getting the environment variables 
    - Use typeorm annotations.
    - Use graphql annotations.
    - Don't forget to validate the data where it is needed.
    - The status property in products can be: 'ACTIVE' or 'DISABLED'. Save this as an enum in turbo packages.
    - To check if the mutation works, get into the graphql playground, and write the queries/mutations and test them.
    - If you think you need to add mutations/queries, add them.
    - Don't forget to use git and save the code in a remote repository
