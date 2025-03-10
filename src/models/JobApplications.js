import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
    applicantName: {
        type: String,
        required: true,
        trim: true,
    },
    applicantEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    resume: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
        required: false,
    },
    positionApplied: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    experienceYears: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Applied', 'Reviewed', 'Interviewed', 'Offered', 'Rejected'],
        default:'Applied'
    },
    applicationDate: {
        type: Date,
        default: Date.now,
    },
});

const JobApplications = mongoose.models.JobApplications || mongoose.model('JobApplications', JobApplicationSchema);

export default JobApplications;
