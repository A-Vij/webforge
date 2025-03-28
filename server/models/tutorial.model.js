import mongoose from "mongoose";
import slugify from "slugify";

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String, // HTML-formatted content
        // required: true,
    },
    file: {
        type: String, // Raw HTML code snippet
        // required: true,
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
    sections: [sectionSchema], // Array of sections
    views: {
        type: Number,
        default: 0, // Default to 0 views
    },
    likes: {
        type: Number,
        default: 0, // Default to 0 likes
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

// Automatically generate a slug from the title
tutorialSchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);
export default Tutorial;
