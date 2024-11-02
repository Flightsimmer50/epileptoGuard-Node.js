import Forum from '../models/Forum.js';
import { validationResult } from "express-validator"; 

export function getAllFeedbacks(req, res) {
    Forum.find({})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function addOnce(req, res) {

    console.log(req.body);
    console.log(req.file);
    if (!validationResult(req).isEmpty()) {
        console.log({ errors: validationResult(req).array() })
        return res.status(400).json({ errors: validationResult(req).array() });
    } else {
        Forum.create({
          description: req.body.description,
          
        })
            .then(() => res.status(201).json("OK"))
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
  
  }


  export async function updateFeedback(req, res) {
    try {
      const descriptionToUpdate = req.params.description; // Extrait la description des paramètres de la requête
    
      // Construit les données de feedback mises à jour
      let newForumData = {
        description: req.body.description || descriptionToUpdate, // Utilise la description de la requête s'il y en a une, sinon utilise la description existante
      };
  
      // Met à jour le feedback dans la base de données
      let updatedFeedback = await Forum.findOneAndUpdate(
        { description: descriptionToUpdate }, 
        newForumData,
        { new: true }
      );
  
      // Gère les réponses
      if (updatedFeedback) {
        console.log("Feedback mis à jour avec succès :", updatedFeedback);
        res.status(200).json(updatedFeedback);
      } else {
        console.log("Feedback non trouvé.");
        res.status(404).json({ error: "Feedback non trouvé" });
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du feedback :", err);
      res.status(500).json({ error: err.message || "Erreur interne du serveur" });
    }
  }
  

  export function deleteFeedback(req, res) {
    const { description } = req.params;

    Forum.findOneAndDelete({ "description": description })
        .then(doc => {
            if (doc) {
                console.log("Forum supprimé avec succès :", doc);
                res.status(200).json(doc);
            } else {
                console.log("Forum non trouvé.");
                res.status(404).json({ message: "Forum non trouvé" });
            }
        })
        .catch(err => {
            console.error("Erreur lors de la suppression du forum :", err);
            res.status(500).json({ error: err });
        });
}






