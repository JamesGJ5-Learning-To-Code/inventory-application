#! /usr/bin/env node

console.log('This script populates some test categories and items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// TODO: replace all stuff using the async module with promise-based code instead
const async = require('async')
const Category = require('./models/category');
const Item = require("./models/item");


const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const categories = [];
const items = [];


function categoryCreate(name, description, cb) {
  categorydetail = { 
    name: name,
    description: description,
  }
    
  const category = new Category(categorydetail);    
  category.save().then(() => {
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category)
  }).catch((err) => {
    // TODO: remove redundant if block
    if (err) {
      cb(err, null);
      return;
    }
  });
}


function itemCreate(name, description, category, price, numberInStock, cb) {
  itemdetail = { 
    name: name,
    description: description,
    category: category,
    price: price,
    numberInStock: numberInStock,
  }
    
  const item = new Item(itemdetail);    
  item.save().then(() => {
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }).catch((err) => {
    // TODO: remove redundant if block
    if (err) {
      console.log('ERROR CREATING Item: ' + item);
      cb(err, null);
      return;
    }
  });
}


function createCategories(cb) {
    async.parallel([
        function(callback) {
          categoryCreate('Books', 'All sorts of books and manga and all that stuff.', callback);
        },
        function(callback) {
          categoryCreate("Computer & Accessories", 'Laptops, computer mouses (mice?) and more.', callback);
        },
        function(callback) {
          categoryCreate("DVD & Blu-ray", 'Wanna buy a DVD?', callback);
        },
        function(callback) {
          categoryCreate("Fashion", "Boots and pants and boots and pants.", callback);
        },
        function(callback) {
          categoryCreate("Grocery","For munchies and more.", callback);
        },
        function(callback) {
          categoryCreate('Handmade', 'All made by hand.', callback);
        },
        function(callback) {
          categoryCreate('Lighting', "Whether you're gonna swing from the chandelier or just change a light bulb.", callback)
        }
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('Berserk Volume 10', 'Not for kids.', categories[0], 11.99, 27, callback)
        },
        function(callback) {
          itemCreate('HP Laptop', 'Not the sauce.', categories[1], 245.73, 6, callback)
        },
        function(callback) {
          itemCreate('Some Pirate Copy', "At least it's cheap.", categories[2], 3.99, 1, callback)
        },
        function(callback) {
          itemCreate('Boots', "These were made for walking and that's just what they'll do.", categories[3], 24.55, 13, callback)
        },
        function(callback) {
          itemCreate('Pants', 'The clothing that keeps the legs warm.', categories[3], 17.12, 5, callback)
        },
        function(callback) {
          itemCreate('Hat', 'For the head.', categories[3], 12.34, 0, callback)
        },
        function(callback) {
          itemCreate('Bread', 'Je voudrais une baguette.', categories[4], 2.99, 1, callback)
        },
        function(callback) {
          itemCreate('Washing Up Liquid', 'Gotta keep those plates clean.', categories[4], 2.87, 0, callback)
        },
        function(callback) {
          itemCreate('Vape', 'Better than smoking, I guess.', categories[4], 3.48, 42, callback)
        },
        function(callback) {
          itemCreate('Dracula', 'The novel by Bram Stoker.', categories[0], 8.99, 17, callback)
        },
        function(callback) {
          itemCreate('Mouse Mat', 'The mice gotta sit somewhere.', categories[1], 5.99, 2, callback)
        }
        ],
        // Optional callback
        cb);
}

async.series([
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('ITEMS: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




