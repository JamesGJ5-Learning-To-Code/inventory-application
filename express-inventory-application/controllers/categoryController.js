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
    .then((foundCategoryDocArray) => {
        res.render("category_list", {
            title: "Categories",
            categoryDocArray: foundCategoryDocArray,
        })
    })
    .catch((err) => next(err));
};

exports.category_detail = (req, res, next) => {
    const categoryID = req.params.id;
    Promise.all(
        [
            Category.findById(categoryID)
                .orFail(),
            Item.find({
                category: categoryID
            }),
        ]
    )
    .then(([foundCategoryDoc, foundItemDocArray]) => {
        res.render("category_detail", {
            title: foundCategoryDoc.name,
            categoryDoc: foundCategoryDoc,
            itemDocArray: foundItemDocArray,
        })
    })
    .catch((err) => next(err));
}

exports.category_create_get = (req, res, next) => {
    res.render("category_form", {
        title: "Create Category",
    });
};

exports.category_create_post = [
    body("categoryName", "Category name required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("categoryDescription", "Category description required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        const errorsResultObject = validationResult(req);
        const newCategoryDoc = new Category({
            name: req.body.categoryName,
            description: req.body.categoryDescription
        });
        if (!errorsResultObject.isEmpty()) {
            res.render("category_form", {
                title: "Create Category",
                newCategoryDoc,
                errorsArray: errorsResultObject.array(),
            });
            return;
        }
        else {
            Category.findOne({ name: newCategoryDoc.name })
            .then((foundCategoryDoc) => {
                if (foundCategoryDoc) {
                    return res.redirect(foundCategoryDoc.url);
                }
                newCategoryDoc.save()
                .then((savedCategoryDoc) => {
                    res.redirect(savedCategoryDoc.url);
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err))
        }
    },
];

exports.category_delete_get = (req, res, next) => {
    // Promise.all(
    //     [
    //         Category.findById(req.params.id)
    //             .orFail(),
    //         Item.find({ category: req.params.id })
    //     ]
    // )
    // .then(([foundCategoryDoc, foundItemArray]) => {
    //     res.render("category_delete", {
    //         title: "Delete Category",
    //         categoryDoc
    //     })
    // })
    // .catch((err) => next(err));
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
