import Sensor from '../models/sensor.js';

export function getAllSensors(req, res) {
    Sensor.find({})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}

export function addOne(req, res) {

  
    Sensor.create(req.body)
        .then(() => res.status(201).json("Ok"))
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}

export function getAllSensorsOfAUser(req, res) {
    Sensor.find({ user: req.params.user })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}