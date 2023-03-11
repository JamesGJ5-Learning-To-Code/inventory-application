const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");


// CATEGORY ROUTES

// GET catalog homepage
// TODO: consider writing said controller in a file like ../controllers/indexController instead
router.get("/", category_controller.index);

// GET category creation view
router.get("/category/create", category_controller.category_create_get);

// POST from category creation view
router.post("/category/create", category_controller.category_create_post);

// GET category deletion view
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST from category deletion view
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET category update view
router.get("/category/:id/update", category_controller.category_update_get);

// POST from category update view
router.post("/category/:id/update", category_controller.category_update_post);

// GET category detail view
router.get("/category/:id", category_controller.category_detail);

// GET category list view
router.get("/categories", category_controller.category_list);


// ITEM ROUTES

// GET item creation view
router.get("/item/create", item_controller.item_create_get);

// POST from item creation view
router.post("/item/create", item_controller.item_create_post);

// GET item deletion view
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST from item deletion view
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET item update view
router.get("/item/:id/update", item_controller.item_update_get);

// POST from item update view
router.post("/item/:id/update", item_controller.item_update_post);

// GET item detail view
router.get("/item/:id", item_controller.item_detail);

// GET item list view
router.get("/items", item_controller.item_list);


module.exports = router;