const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const id = req.body.id
    try {
        const newProduct = await pool.query("SELECT * FROM smartphone WHERE id = $1", [id])
        const product = newProduct.rows[0]
        res.send(product)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router