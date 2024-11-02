import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: false,
        default: new Date('2000-07-21'),
    },
    resetCode: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor','admin'],
    },

    numP: {
        type: [Number],
        required: false,

    },
    weight: {
        type: Number,
        required: false,
        default: 63,
    },

    height: {
        type: Number,
        required: false,
        default: 172,
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    isActivated: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
});

export default model('User', userSchema);