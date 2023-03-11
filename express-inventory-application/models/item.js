const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: {
            type: Number,
            get: v => (v / 100).toFixed(2),
            set: v => v * 100,
            required: true,
        },
        numberInStock: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

ItemSchema.virtual("url").get(function() {
    return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);