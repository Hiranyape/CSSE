const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { Construction } = require('../models/Construction');

router.get('/', (req, res) => {
    Construction.find().exec()
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
        });
});

router.get('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(req.params.id);
    }

    Construction.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var newRecord = new Construction({
        date: req.body.date,
        location: req.body.location,
        suppiler: req.body.supplier, // Correct the typo here, 'suppiler' to 'supplier'
        budget: req.body.budget
    });

    newRecord.save()
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ "err": "error" });
        });
});

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(req.params.id);
    }

    var updateRecords = {
        date: req.body.date,
        location: req.body.location,
        suppiler: req.body.supplier, // Correct the typo here, 'suppiler' to 'supplier'
        budget: req.body.budget
    };

    Construction.findByIdAndUpdate(req.params.id, { $set: updateRecords }, { new: true }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(err);
            res.status(400).send({ "err": "error" });
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(req.params.id);
    }

    Construction.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    });
});

module.exports = router;
