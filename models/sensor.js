import mongoose from "mongoose";

const { Schema, model } = mongoose;

const sensorSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    imu: {
        type: [Number],
        required: false
    },
    emg: {
        type: [Number],
        required: false
    },
    bmp:{
        type: [Number],
        required: false
    },
    
},
{
    timestamps: true
});

export default model('Sensor', sensorSchema);
