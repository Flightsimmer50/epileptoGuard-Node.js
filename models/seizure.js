import mongoose from "mongoose";

const { Schema, model } = mongoose;

const seizureSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    formDataId: { 
        type: Schema.Types.ObjectId, 
        ref: 'PostCriseFormData', 
        required: false 
    },
    date: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type: String,
        required: true,
        default: Date.now
    },
    endTime: {
        type: String,
        required: true
       // default: Date.now
    },
    duration: {
        type: Number
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['partial', 'generalized', 'absence'],
        required: true
    },
    emergencyServicesCalled: {
        type: Boolean,
        default: false
    },
    medicalAssistance: {
        type: Boolean,
        required: false
    },
    severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        default: 'mild'
    }
   
},
{
    timestamps: true
});

seizureSchema.pre('save', function (next) {
    if (this.startTime && this.endTime) {
      const durationInMillis = new Date(this.endTime) - new Date(this.startTime);
      this.duration = durationInMillis / 1000; 
    }
    next();
});

export default model('Seizure', seizureSchema);
