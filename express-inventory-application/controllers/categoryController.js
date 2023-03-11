const Category = require("../models/category");
const Item = require("../models/item");

const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
    Promise.all(
        [
            Category.countDocuments({}),
            Item.countDocuments({}),
        ]
    )
    .then(([categoryCount, itemCount]) => {
        res.render("index", {
            title: "Catalog Home",
            categoryCount,
            itemCount,
        });
    })
    .catch((err) => {
        res.render("index", {
            title: "Catalog Home",
            error: err,
        });
    });
};

exports.category_list = (req, res, next) => {
    Category.find({}, "name")
        .sort({name: 1})
    .then((categoryArray) => {
        res.render("category_list", {
            title: "Categories",
            categoryArray,
        })
    })
    .catch((err) => next(err));
};

exports.category_detail = (req, res, next) => {
    res.send("TODO: implement category_detail controller");
}

exports.category_create_get = (req, res, next) => {
    res.send("TODO: implement category_create_get controller");
};

exports.category_create_post = [
    (req, res, next) => res.send("TODO: implement category_create_post controller"),
];

exports.category_delete_get = (req, res, next) => {
    res.send("TODO: implement category_delete_get controller");
};

exports.category_delete_post = (req, res, next) => {
    res.send("TODO: implement category_delete_post controller");
};

exports.category_update_get = (req, res, next) => {
    res.send("TODO: implement category_update_get controller");
};

exports.category_update_post = [
    (req, res, next) => res.send("TODO: implement category_update_post controller"),
];
