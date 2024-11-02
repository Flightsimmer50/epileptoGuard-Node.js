import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const postCriseFormDataSchema = new Schema({
    criseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seizure', required: true },
    selectedHours: { type: Number, required: true },
    selectedMinutes: { type: Number, required: true },
    response1: { type: String, required: false },
    visualAuraChecked: { type: Boolean, required: false },
    sensoryAuraChecked: { type: Boolean, required: false },
    auditoryAuraChecked: { type: Boolean, required: false },
    gustatoryOrOlfactoryAuraChecked: { type: Boolean, required: false },
    headachesChecked: { type: Boolean, required: false },
    excessiveFatigueChecked: { type: Boolean, required: false },
    abnormalMoodChecked: { type: Boolean, required: false },
    sleepDisturbancesChecked: { type: Boolean, required: false },
    concentrationDifficultiesChecked: { type: Boolean, required: false },
    increasedSensitivityChecked: { type: Boolean, required: false },
    triggerFactorsSelection: { type: [Boolean], required: false },
    injured: { type: Boolean, required: true },
    emotionalStateRating: { type: Number, required: true },
    recoveryRating: { type: Number, required: true },
    medicationIntake: { type: Boolean, required: true },
    conscious: { type: Boolean, required: true },
    episodes: { type: Boolean,  required: true },
    memoryDisturbances: { type: Boolean, required: true },
    stressAnxietyRating: { type: Number, required: true },
    response2: { type: String, required: false },
    assistance: { type: Boolean, required: true },
    medicalCareRating: { type: Number, required: true },
    advice: { type: Boolean, required: true },
    response3: { type: String, required: false },
    submitted: { type: Boolean, default: false } // Champ indiquant si le formulaire a été soumis
}, {
    timestamps: true
});

export default model('PostCriseFormData', postCriseFormDataSchema);
