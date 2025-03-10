import { Schema } from "mongoose";
import mongoose from "mongoose";

const enquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    part: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProductQuery = mongoose.models.ProductQuery || mongoose.model("ProductQuery", enquirySchema)

export default ProductQuery