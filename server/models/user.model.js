import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    experiencePoints: {
        type: Number, 
        default: 0
    },

    level: {
        type: Number, 
        default: 1
    },
    completedQuests: [
        {
            questId: { type: mongoose.SchemaTypes.ObjectId, ref: "System" },
            current: {type: Number, default: 0},
            completed: {type: Boolean, default: false},
            rewardsClaimed: {type: Boolean, default: false},
            completedAt: { type: Date, default: Date.now},
        }
    ],
    achievements: [
        {
            name: String,
            earnedAt: {type: Date, default: Date.now }
        }
    ],

    progress: [
        {
            tutorialId: { type: mongoose.SchemaTypes.ObjectId, ref: "Tutorial" },
            completed: {type: Boolean, default: false},
            lastAccessed: {type: Date, default: Date.now},
        }
    ],

    badges: [
        {
            name: String,
            icon: String,
            earnedAt: {type: Date, default: Date.now }
        }
    ],

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;