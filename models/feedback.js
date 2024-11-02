import mongoose from "mongoose";

const { Schema, model } = mongoose;

const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    feedback: {
        type: String,
        required: true,
    },
});
export default model('Feedback', feedbackSchema);