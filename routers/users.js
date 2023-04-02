const router = require('express').Router();
const users = require('../models/users.js');
const {
    validateItemId,
    validatePostReqBody
} = require('../api/middleware.js')

router.get('/', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving the users.' })
            console.log(err)
        })
})

router.get('/:id', validateItemId, (req, res) => {
    const id = req.params.id
    users.findById(id)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving the item.' })
            console.log(err)
        })
})

router.post('/', validatePostReqBody, (req, res) => {
    const item = req.body
    users.add(item)
        .then(id => {
            [newItemId] = id
            return users.findById(newItemId['id'])
        })
        .then(item => {
            res.status(201).json({ message: 'Successfully added the item.', item })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error adding the item.' })
        })
})

router.put('/:id', validateItemId, (req, res) => {
    const id = req.params.id
    const updated = req.body
    users.edit(id, updated)
        .then(updatedItemId => {
            [updatedItemId] = updatedItemId
            return users.findById(updatedItemId['id'])
        })
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error updating the item.' })
        })
})

router.delete('/:id', validateItemId, (req, res) => {
    const id = req.params.id
    users.remove(id)
        .then(deleted => {
            res.status(200).json({ message: 'Successfully removed the item.' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Error removing the item.' })
        })
})

module.exports = router;
