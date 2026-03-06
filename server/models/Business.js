const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    fullName: String,
    businessName: String,
    phone: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model("Business", businessSchema)