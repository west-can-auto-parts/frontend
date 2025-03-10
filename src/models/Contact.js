import { Schema, mongo } from "mongoose";
import mongoose from "mongoose";

const contactResponseSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: false },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
    agreed: { type: Boolean, required: true }
}, {
    timestamps: true
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactResponseSchema)

export default Contact