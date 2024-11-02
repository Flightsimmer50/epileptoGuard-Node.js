import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Schéma pour le forum contenant uniquement la description
const ForumSchema = new Schema({
  description: {
    type: String,
    required: true
  }
});

// Modèle de forum basé sur le schéma
const ForumModel = model("Forum", ForumSchema);

export default ForumModel;
