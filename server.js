const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
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
server.get('/api/accounts/:id', (req, res) => {
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
server.post('/api/accounts/', (req, res) => {

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
server.put('/api/accounts/:id', (req, res) => {
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
server.delete('/api/accounts/:id', (req, res) => {
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


module.exports = server;