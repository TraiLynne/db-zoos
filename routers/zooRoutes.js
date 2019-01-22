const express = require('express');

const router = express.Router();

const db = require('../data/helpers/zooModel');

router.use(express.json());

// C - Create
router.post('/', async (req, res) => {
    const newRecord = req.body;

    try {
        if (!newRecord.name || newRecord.name === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a name for the new record'
                });
        } else {
            let newId = await db.create(newRecord);

            newId ?
                res
                .status(201)
                .json(newId[0]) :
                res
                .status(500)
                .json({
                    errorMessage: 'Houston we have a problem'
                });

        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            });
    }
});

// R - Read 
// All
router.get('/', async (req, res) => {

    try {
        const zoos = await db.readAll()

        zoos.length > 0 ?
            res
            .status(200)
            .json(zoos) :
            res
            .status(404)
            .json({
                errorMessage: 'There are no zoos found'
            })
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            });
    }
});

// Unique
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const zoo = await db.findById(id);

        zoo ?
            res
            .status(200)
            .json(zoo) :
            res
            .status(404)
            .json({
                errorMessage: 'There is no zoo found'
            })
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            });
    }
});

// U - Update
router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const updates = req.body;

    try {
        const changes = await db.update(id, updates);


        changes ?
            res
            .status(200)
            .json({
                changes: changes
            }) :
            res
            .status(500)
            .json({
                errorMessage: 'There was an error processing your request'
            });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            });
    }
});

// D - Destroy
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        let deleted = await db.destroy(id);

        deleted ?
            res
            .status(200)
            .json({
                deleted: deleted
            }) :
            res
            .status(500)
            .json({
                errorMessage: 'There was a problem processing your request. Please try again.'
            });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            });
    }
})

module.exports = router;