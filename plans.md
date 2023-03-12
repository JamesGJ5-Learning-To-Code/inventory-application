# Suggestions from TOP

- Inventory management app for imaginary store

- Choose a business, e.g. groceries, car parts, baby-toys, musical-instruments, ponies...

- App should have:
    1. Categories--so when user goes to home-page they can choose category to view
    2. Items--so when viewing a category the user gets a list of every item in that category

- Include all CRUD methods:
    1. Create (e.g. of item or category via post from form)
    2. Read (e.g. of all items in a category via get whose callback extract them from a DB)
    3. Update (e.g. of item or category via post from form)
    4. Delete (e.g. of item or category via post from form)

1. DONE Write down all models needed and fields that should go in them (maybe draw a UML association diagram like the one at https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#designing_the_locallibrary_models):

    1. Item model should at least have:
        1. Fields
            1. name
            2. description
            3. category (reference to a Category object via its ID)
            4. price (see accepted answer at https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose for help with decimal handling)
            5. numberInStock
        2. Virtuals:
            1. URL (including Item's ID)

    2. Category model should at least have:
        1. Fields:
            1. name
            2. description
        2. Virtuals:
            1. URL (including Category's ID)

2. DONE Generate boilerplate with express-generator (which will come with .pug views)

3. DONE Create new Mongo project and database for development using the web-interface as demonstrated in the tutorial

4. DONE Set up your database schemas and models in the project directory

5. DONE Download https://raw.githubusercontent.com/JamesGJ5/mdn-local-library-project/main/express-locallibrary-tutorial/populatedb.js?token=GHSAT0AAAAAAB5OR34BVZ6BVVFBUWF6VJD2ZAMVWJQ, edit it to match your project and use it to populate the development database accordingly for testing

6. DONE Set up routes that will be needed

7. DONE Set up the controllers that will be needed

8. DONE Write all 'READ' views:
    1. One to view Category
    2. One to view Item

9. DONE Write views containing forms which can both create (starting with blank fields) and update (starting with fields populated by data of object to be updated):
    1. One for Category
    2. One for Item
    
10. Switch to pug if convenient (as done in MDN tutorial)

11. Decide whether or not to do the "EXTRA CREDIT" tasks
