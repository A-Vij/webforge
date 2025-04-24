import mongoose from "mongoose";
import slugify from "slugify";

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String, 
    },
    file: {
        type: String, 
    }
});

const tutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    }, 
    sections: [sectionSchema],
    challenge: {
        desc: {type: String},
        file: {type: String}
    },
    solution: {
        desc: {type: String},
        file: {type: String}
    },
    views: {
        type: Number,
        default: 0, 
    },
    likes: {
        type: Number,
        default: 0, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

tutorialSchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);
export default Tutorial;
