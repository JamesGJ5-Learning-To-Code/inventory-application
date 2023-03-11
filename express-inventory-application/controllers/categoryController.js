const Category = require("../models/category");
const Item = require("../models/item");

const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.render("TODO: implement index controller");
};

exports.category_list = (req, res, next) => {
    res.render("TODO: implement category_list controller");
};

exports.category_detail = (req, res, next) => {
    res.render("TODO: implement category_detail controller");
}

exports.category_create_get = (req, res, next) => {
    res.render("TODO: implement category_create_get controller");
};

exports.category_create_post = [
    (req, res, next) => res.render("TODO: implement category_create_post controller"),
];

exports.category_delete_get = (req, res, next) => {
    res.render("TODO: implement category_delete_get controller");
};

exports.category_delete_post = (req, res, next) => {
    res.render("TODO: implement category_delete_post controller");
};

exports.category_update_get = (req, res, next) => {
    res.render("TODO: implement category_update_get controller");
};

exports.category_update_post = [
    (req, res, next) => res.render("TODO: implement category_update_post controller"),
];
