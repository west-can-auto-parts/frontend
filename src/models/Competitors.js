import mongoose from "mongoose";

const CompetitorsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    categories: {
        type: [String],
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorLinkedin: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    featured:{
        type:Boolean,
        default:false,
    },
    newBlog:{
        type:Boolean,
        default:true,
    }
});

const Competitors = mongoose.models.Competitors || mongoose.model('Blogs', CompetitorsSchema)

export default Competitors