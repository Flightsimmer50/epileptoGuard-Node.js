//implementaion of the drug controller
import Drug from '../models/drug.js';
import { validationResult } from "express-validator"; 

export function getAllDrugs(req, res) {
    Drug.find({})
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
        Drug.create({
          name: req.body.name,
          description: req.body.description,
          startTakingDate: req.body.startTakingDate,
          endTakingDate: req.body.endTakingDate,
          dayOfWeek: req.body.dayOfWeek,
          numberOfTimeADay: req.body.numberOfTimeADay,
          quantityPerTake: req.body.quantityPerTake,
          user: req.body.user,
          image: '1708101590858.png'
        })
            .then(() => res.status(201).json("OK"))
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
  
  }

  export async function updateDrug(req, res) {
    try {
      const nameToUpdate = req.params.name; // Extract name from request parameters
  
      let newDrugData = req.file
        ? {
            name: nameToUpdate,
            description: req.body.description,
            startTakingDate: req.body.startTakingDate,
            endTakingDate: req.body.endTakingDate,
            dayOfWeek: req.body.dayOfWeek,
            numberOfTimeADay: req.body.numberOfTimeADay,
            quantityPerTake: req.body.quantityPerTake,
            image: '1708101590858.png'
          }
        : {
            name: nameToUpdate,
            description: req.body.description,
            startTakingDate: req.body.startTakingDate,
            endTakingDate: req.body.endTakingDate,
            dayOfWeek: req.body.dayOfWeek,
            numberOfTimeADay: req.body.numberOfTimeADay,
            quantityPerTake: req.body.quantityPerTake,
            image: '1708101590858.png'
          };
  
      let updatedDrug = await Drug.findOneAndUpdate(
        { name: nameToUpdate }, // Update based on name
        newDrugData,
        { new: true }
      );
  
      if (updatedDrug) {
        console.log("Drug updated successfully:", updatedDrug);
        res.status(200).json(updatedDrug);
      } else {
        console.log("Drug not found.");
        res.status(404).json({ error: "Drug not found" });
      }
    } catch (err) {
      console.error("Error during drug update:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  }

  export function deleteDrug(req, res) {
    
    const { name } = req.params;

    Drug.findOneAndDelete({ "name": name })
        .then(doc => {
            if (doc) {
                console.log("Drug supprimé avec succès :", doc);
                res.status(200).json(doc);
            } else {
                console.log("Drug non trouvé.");
                res.status(404).json({ message: "Drug non trouvé" });
            }
        })
        .catch(err => {
            console.error("Erreur lors de la suppression de Drug :", err);
            res.status(500).json({ error: err });
        });
}