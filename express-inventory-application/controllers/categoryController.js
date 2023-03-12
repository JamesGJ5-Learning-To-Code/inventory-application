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
    // TODO: consider characters that shouldn't be escaped, and whether it would be safe 
    // not to escape them. E.g. the apostrophe.
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
    },
];

exports.category_delete_get = (req, res, next) => {
    Promise.all(
        [
            Category.findById(req.params.id),
            Item.find({ category: req.params.id }),
        ]
    )
    .then(([foundCategoryDoc, foundItemDocArray]) => {
        if (foundCategoryDoc == null) {
            return res.redirect("/catalog/categories");
        }
        res.render("category_delete", {
            title: "Delete Category",
            categoryDoc: foundCategoryDoc,
            itemDocArray: foundItemDocArray,
        });
    })
    .catch((err) => next(err));
};

exports.category_delete_post = (req, res, next) => {
    Promise.all(
        [
            Category.findById(req.body.categoryDocId),
            Item.find({ category: req.body.categoryDocId }),
        ]
    )
    .then(([foundCategoryDoc, foundItemDocArray]) => {
        if (foundItemDocArray.length > 0) {
            res.render("category_delete", {
                title: "Delete Category",
                categoryDoc: foundCategoryDoc,
                itemDocArray: foundItemDocArray,
            });
            return;
        }
        Category.findByIdAndRemove(req.body.categoryDocId)
        .then(() => {
            res.redirect("/catalog/categories");
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err))
};

exports.category_update_get = (req, res, next) => {
    Category.findById(req.params.id)
        .orFail()
    .then((foundCategoryDoc) => {
        res.render("category_form", {
            title: "Update Category",
            newCategoryDoc: foundCategoryDoc,
        });
    })
    .catch((err) => next(err));
};

exports.category_update_post = [
    // TODO: consider characters that shouldn't be escaped, and whether it would be safe 
    // not to escape them. E.g. the apostrophe.
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
            description: req.body.categoryDescription,
            _id: req.params.id,
        });
        if (!errorsResultObject.isEmpty()) {
            res.render("category_form", {
                title: "Update Category",
                newCategoryDoc,
                errorsArray: errorsResultObject.array(),
            });
            return;
        }
        Category.findByIdAndUpdate(req.params.id, newCategoryDoc, {})
        .then((savedCategoryDoc) => {
            res.redirect(savedCategoryDoc.url);
        })
        .catch((err) => next(err));
    }
];
