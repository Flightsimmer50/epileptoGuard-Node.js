import mongoose from "mongoose";

const { Schema, model } = mongoose;

const drugSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    startTakingDate: {
        type: Date,
        required: true
    },
    endTakingDate: {
        type: Date,
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    numberOfTimeADay: {
        type: String,
        required: true
    },
    quantityPerTake: {
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },

},
{
    timestamps: true
});

export default model('Drug', drugSchema);
