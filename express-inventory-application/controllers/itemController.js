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
    res.send("TODO: implement item_detail controller");
}

exports.item_create_get = (req, res, next) => {
    res.send("TODO: implement item_create_get controller");
};

exports.item_create_post = [
    (req, res, next) => res.send("TODO: implement item_create_post controller"),
];

exports.item_delete_get = (req, res, next) => {
    res.send("TODO: implement item_delete_get controller");
};

exports.item_delete_post = (req, res, next) => {
    res.send("TODO: implement item_delete_post controller");
};

exports.item_update_get = (req, res, next) => {
    res.send("TODO: implement item_update_get controller");
};

exports.item_update_post = [
    (req, res, next) => res.send("TODO: implement item_update_post controller"),
];
