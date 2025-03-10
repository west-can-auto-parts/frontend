import { Schema } from "mongoose";
import mongoose from "mongoose";

const featuredProductSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    extendedDescription: {
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
    subCategory: {
        type: String,
        required: true,
    }

})

const FeaturedProducts = mongoose.models.FeaturedProducts || mongoose.model("FeaturedProducts", featuredProductSchema)

export default FeaturedProducts