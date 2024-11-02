// Importer le modèle Seizure
import Seizure from "../models/seizure.js";
import postCriseFormData from "../models/postCriseFormData.js";
import mongoose from 'mongoose';



export async function createSeizure(req, res) {
    const { date, startTime, endTime, duration, location, type, emergencyServicesCalled, medicalAssistance, severity } = req.body;
    const userId = req.user.userId;
    if ( !date || !startTime || !endTime || !location || !type || !emergencyServicesCalled || !severity) {
        return res.status(400).json({ error: 'userId, date, startTime, endTime, location, emergencyServicesCalled, severity, and type are required fields.' });
    }

    try {
        // Créer une nouvelle instance de crise
        const newSeizure = new Seizure({
            userId,
            date,
            startTime,
            endTime,
            duration,
            location,
            type,
            emergencyServicesCalled,
            medicalAssistance,
            severity
        });

        // Enregistrer la crise dans la base de données
        const savedSeizure = await newSeizure.save();

       /* // Créer un nouveau formulaire associé à la crise
        const newFormData = new postCriseFormData({
            criseId: savedSeizure._id,
            // Autres champs de formulaire ici
        });*/

        // Enregistrer le formulaire dans la base de données
       // const savedFormData = await newFormData.save();

        res.status(201).json({ seizure: savedSeizure});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Récupérer toutes les crises avec les formulaires associés pour un utilisateur spécifique
export async function getAllSeizures(req, res) {
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session

    try {
        // Utiliser la méthode aggregate pour récupérer toutes les données de formulaire pour cet utilisateur spécifique
        const seizures = await Seizure.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) } // Filtrer les crises par userId
            },
            {
                $lookup: {
                    from: "postcriseformdatas",
                    localField: "_id",
                    foreignField: "criseId",
                    as: "formData"
                }
            }
        ]);
        res.status(200).json(seizures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Récupérer une crise par son ID avec le formulaire associé pour un utilisateur spécifique
export async function getSeizureById(req, res) {
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session
    const seizureId = req.params.id;
    try {
        // Vérifier si la crise appartient à l'utilisateur actuel
        const seizure = await Seizure.findOne({ _id: seizureId, userId: userId });
        if (!seizure) {
            return res.status(404).json({ error: 'Seizure not found for this user' });
        }
        
        // Récupérer les données du formulaire associées à cette crise
        const formData = await postCriseFormData.findOne({ criseId: seizureId });
        
        // Retourner les détails de la crise avec les données de formulaire
        res.status(200).json({ seizure, formData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Mettre à jour une crise
export async function updateSeizure(req, res) {
    const seizureId = req.params.id;
    const { date, startTime, endTime, duration, location, symptoms, preSymptoms, emergencyServicesCalled, medicalAssistance, severity, type } = req.body;
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session

    try {
        // Vérifier si la crise appartient à l'utilisateur actuellement authentifié
        const seizure = await Seizure.findById(seizureId);
        if (!seizure) {
            return res.status(404).json({ error: 'Seizure not found' });
        }

        if (seizure.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' }); // L'utilisateur n'est pas autorisé à modifier cette crise
        }

        const updatedSeizure = await Seizure.findByIdAndUpdate(seizureId, {
            date,
            startTime,
            endTime,
            duration,
            location,
            type,
            emergencyServicesCalled,
            medicalAssistance,
            severity,
            //formDataId
        }, { new: true }); // Retourner la crise mise à jour

        res.status(200).json(updatedSeizure);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Supprimer une crise et son formulaire associé
export async function deleteSeizure(req, res) {
    const seizureId = req.params.id;
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session

    try {
        // Trouver la crise par son ID
        const seizure = await Seizure.findById(seizureId);
        if (!seizure) {
            return res.status(404).json({ error: 'Seizure not found' });
        }
        /*// Vérifier si la crise appartient à l'utilisateur actuellement authentifié
        if (seizure.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' }); // L'utilisateur n'est pas autorisé à supprimer cette crise
        }*/
        // Supprimer la crise
        const deletedSeizure = await Seizure.findByIdAndDelete(seizureId);

        // Supprimer également le formulaire associé
        await postCriseFormData.findOneAndDelete({ criseId: seizureId });

        res.status(200).json(deletedSeizure);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

