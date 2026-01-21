# How I Handle Add Product State
```
Step 1 : Create One Component Which is responsible to Adding new Product By Allowing user to add Information About Product 

Step 2 : For Storing Form Data i've Used Object Which Handle All the field of that form (ex : name,price,qty,brand,category)

Step 3 : Put 2 Button One For Adding That Procut Detail Which Filled on Form and Other For Reset The form

Step 4 : Create One Function Which is Responsible for validate the field which entered by the user.

Step 5 : if any validation error are there then it will display below the form

Step 6 : if no error then we store that product in local storage, for that we first fetch the current storaged products and then add it with help of spread(...) operator

Step 7 : We have also pass the setProducts in form of props for updating list when new product is added

Step 8 : So After adding that new Product we just Clear the Form

```