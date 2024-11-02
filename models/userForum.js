import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userForumSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

});

export default model('UserForum', userForumSchema);

