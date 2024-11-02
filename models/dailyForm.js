import mongoose from 'mongoose';


const {Schema,model} = mongoose;

const dailyFormSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },

    bedTime: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true }
    },
    wakeUpTime: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true }
    },
    stress: { type: Number, required: true },
    alcoholDrug: { type: Number, required: true },
    medication: { type: Boolean, required: false },
    moodchanges: { type: Number, required: true },
    sleeping: { type: Number, required: false },
    flashingLights: { type: Number, required: false },
    exercise: { type: Number, required: false },
    mealSleepNoValue: { type: String, required: true },
    recentChanges: { type: String, required: false },
    visualAuraChecked: { type: Boolean, required: true },
    sensoryAuraChecked: { type: Boolean, required: true },
    auditoryAuraChecked: { type: Boolean, required: true },
    gustatoryOrOlfactoryAuraChecked: { type: Boolean, required: true },
    headachesChecked: { type: Boolean, required: true },
    excessiveFatigueChecked: { type: Boolean, required: true },
    abnormalMoodChecked: { type: Boolean, required: true },
    sleepDisturbancesChecked: { type: Boolean, required: true },
    concentrationDifficultiesChecked: { type: Boolean, required: true },
    increasedSensitivityChecked: { type: Boolean, required: true },
    isArchived: { type: Boolean, default: false }
}, 
{ 
    timestamps: true 
});

export default model('DailyForm', dailyFormSchema);
