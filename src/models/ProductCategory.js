import { Schema } from "mongoose";
import mongoose from "mongoose";

const productCategoryScehma = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrls: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
        required: false
    },
    category: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default:true,
    },
    isBestSeller:{
        type:Boolean,
        default:false,
    }

})

const ProductCategory = mongoose.models.ProductCategory || mongoose.model("ProductCategory", productCategoryScehma)

export default ProductCategory