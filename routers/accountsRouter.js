const express = require('express');

const db = require('../data/dbConfig');

router = express.Router()

router.get('/accounts', (req, res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            res.json(accounts)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "can not find accounts"
            })
        })
})
router.get('/accounts/:id', (req, res) => {
    const account_id = req.params.id
    db.select('*').from('accounts').where(({ id: account_id }))
        .then(account => {
            res.json(account)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "can not find account"
            })
        })
})
router.post('/accounts/', (req, res) => {

    const body = req.body
    db('accounts').insert(req.body)
        .then(account => {
            res.json(account)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "can not find account"
            })
        })
})
router.put('/accounts/:id', (req, res) => {
    const account_id = req.params.id
    const body = req.body
    db('accounts').where(({ id: account_id }))
        .update(body)
        .then(account => {
            res.json(account)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "danger will Robinson, account cannot be found"
            })
        })
})
router.delete('/accounts/:id', (req, res) => {
    const account_id = req.params.id
    db('accounts').where(({ id: account_id }))
        .del()
        .then(deleted_id => {
            res.json(deleted_id)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "danger will Robinson, account cannot be found"
            })
        })
})

module.exports = router