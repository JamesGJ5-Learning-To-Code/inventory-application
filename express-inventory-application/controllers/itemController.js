const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");

exports.item_list = (req, res, next) => {
    Item.find({}, "name")
        .sort({ name: 1 })
    .then((foundItemDocArray) => {
        res.render("item_list", {
            title: "Items",
            itemDocArray: foundItemDocArray,
        });
    })
    .catch((err) => next(err));
};

exports.item_detail = (req, res, next) => {
    Item.findById(req.params.id)
        .orFail()
        .populate("category")
    .then((foundItemDoc) => {
        res.render("item_detail", {
            title: foundItemDoc.name,
            itemDoc: foundItemDoc,
        });
    })
    .catch((err) => next(err));
}

exports.item_create_get = (req, res, next) => {
    // TODO: consider daisy-chaining an orFail() method call to the find() call in case 
    // no categories are found, because then, Item won't even be able to be created if 
    // rendered form is submitted
    Category.find({}, "name")
    .then((foundCategoryDocArray) => {
        res.render("item_form", {
            title: "Create Item",
            categoryDocArray: foundCategoryDocArray
        });
    })
    .catch((err) => next(err));
};

exports.item_create_post = [
    body("itemName", "Item name is required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemDescription", "Item description is required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemCategoryId", "Item category is required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemPrice", "Valid item price is required")
        .trim()
        .isLength({ min: 1 })
        .isDecimal()
        .escape(),
    body("numberInStock", "Valid number in stock is required")
        .trim()
        .isLength({ min: 1 })
        .isDecimal()
        .escape(),
    (req, res, next) => {
        const errorsResultObject = validationResult(req);
        const itemPrice = parseInt(req.body.itemPrice);
        const numberInStock = parseInt(req.body.numberInStock);
        const newItemDoc = new Item({
            name: req.body.itemName,
            description: req.body.itemDescription,
            category: req.body.itemCategoryId,
            price: itemPrice,
            numberInStock: numberInStock,
        });
        if (!errorsResultObject.isEmpty()) {
            Category.find({}, "name")
            .then((foundCategoryDocArray) => {
                res.render("item_form", {
                    title: "Create Item",
                    categoryDocArray: foundCategoryDocArray,
                    selectedCategoryDocId: newItemDoc.category.toString(),
                    newItemDoc,
                    errorsArray: errorsResultObject.array(),
                });
            })
            .catch((err) => next(err));
            return;
        }
        newItemDoc.save()
        .then((savedItemDoc) => {
            res.redirect(savedItemDoc.url);
        })
        .catch((err) => next(err));
    },
];

exports.item_delete_get = (req, res, next) => {
    Item.findById(req.params.id)
    .then((foundItemDoc) => {
        if (foundItemDoc === null) {
            return res.redirect("/catalog/items");
        }
        res.render("item_delete", {
            title: "Delete Item",
            itemDoc: foundItemDoc,
        });
    })
    .catch((err) => next(err));
};

exports.item_delete_post = (req, res, next) => {
    Item.findByIdAndRemove(req.body.itemDocId)
    .then(() => {
        res.redirect("/catalog/items");
    })
    .catch((err) => next(err));
};

exports.item_update_get = (req, res, next) => {
    res.send("TODO: implement item_update_get controller");
};

exports.item_update_post = [
    (req, res, next) => res.send("TODO: implement item_update_post controller"),
];
