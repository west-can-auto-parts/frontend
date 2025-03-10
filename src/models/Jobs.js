import mongoose from 'mongoose';

const JobOpeningSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: [String],
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        required: true,
    },
    salaryRange: {
        type: String,
        required: false,
    },
    applicationDeadline: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    active:{
        type:Boolean,
        default:true,
    }
});

const Jobs = mongoose.models.Jobs || mongoose.model('Jobs', JobOpeningSchema);

export default Jobs;
