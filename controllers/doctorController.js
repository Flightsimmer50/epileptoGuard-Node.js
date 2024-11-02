import User from '../models/user.js';
import Sensor from '../models/sensor.js';


export function getPatients(req, res) {
    User.find({ role: 'patient' }).then(patients => {
        res.status(200).json({ data: patients });
    }).catch(err => {
        res.status(500).json({ message: err })
    });
};

export function findPatientById(req, res) {
    User.findById(req.body.id).then(patient => {
        res.status(200).json({ data: patient });
    }).catch(err => {
        res.status(500).json({ message: err })
    });
};

export function getSensorData(req, res) {
    console.log(req.params.id)
    Sensor.find({ user: req.params.id }).then(data => {
        res.status(200).json({ data: data });
    }).catch(err => {
        res.status(500).json({ message: err })
    });
};