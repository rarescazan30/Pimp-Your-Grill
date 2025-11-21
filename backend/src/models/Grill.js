const mongoose = require("mongoose");

const grillSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        unique: true
    },
    fuelType: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    color: {
        type: String
    },
    comesWithRecipes: {
        type: Boolean
    },
    recipes: {
        type: [String]
    },

});

const Grill = mongoose.model("Grill", grillSchema);

module.exports = Grill;
    