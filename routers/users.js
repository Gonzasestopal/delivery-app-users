const router = require('express').Router();
const users = require('../models/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    validateItemId,
    validatePostReqBody,
    verifyToken,
    isAdmin,
} = require('../api/middleware.js')

class UserExists extends Error {
    constructor(message) {
        super(message);
        this.name = "UserExists";
    }
}

router.get('/', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving the users.' })
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
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send("All input is required");
    }

    users.findByEmail(email)
        .then(user => {
            if (!user) {
                throw new Error()
            }
            return bcrypt.compare(password, user.password)
                .then(verified => {
                    if (!verified) {
                        throw new Error()
                    }
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        is_admin: user.is_admin,
                    }, process.env.TOKEN_KEY, {
                        expiresIn: "2h",
                    })
                    return users.edit(user.id, { token: token })
                })
                .catch(err => {
                    res.status(500).json({ message: 'Invalid Credentials' })
                })
        })
        .then(id => {
            [newItemId] = id
            return users.findById(newItemId['id'])
        })
        .then(item => {
            res.status(200).json({ message: 'Successfully logged in.', item })
        })
        .catch(err => {
            res.status(500).json({ message: 'Invalid Credentials' })
        })

})

router.post('/', validatePostReqBody, (req, res) => {
    const item = req.body;

    users.findByEmail(item.email)
        .then(user => {
            if (user) {
                throw new UserExists();
            }
        })
        .then(_ => {
            return bcrypt.hash(item.password, 10)
        })
        .then(encryptedPassword => {
            return users.add({
                'name': item.name,
                'email': item.email.toLowerCase(),
                'password': encryptedPassword,
            })
        })
        .then(id => {
            [newItemId] = id
            return users.findById(newItemId['id'])
        })
        .then(user => {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                is_admin: user.is_admin,
            }, process.env.TOKEN_KEY, {
                expiresIn: "2h",
            })
            return users.edit(user.id, { token: token })
        })
        .then(id => {
            [newItemId] = id
            return users.findById(newItemId['id'])
        })
        .then(item => {
            res.status(201).json({ message: 'Successfully added the item.', item })
        }).catch(err => {
            if (err.name == "UserExists") {
                res.status(409).json({ message: 'User Already Exist. Please Login' });
                return;
            }
            res.status(500).json({ message: 'Error adding the item.' })
        })
})

router.put('/:id', verifyToken, isAdmin, validateItemId, (req, res) => {
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
            res.status(500).json({ message: 'Error updating the item.' })
        })
})

router.delete('/:id', verifyToken, isAdmin, validateItemId, (req, res) => {
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
