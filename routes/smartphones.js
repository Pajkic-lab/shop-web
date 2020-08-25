const express = require('express')
const router = express.Router()
const { cloudinary } = require('../cloudinary')
const auth = require('../middleware/auth')
const pool = require('../db')



router.get('/', async(req, res)=> {
    const {page, limit} = req.query
    const startIndex = page * limit
    try {
        const newProducts = await pool.query("SELECT * FROM smartphone OFFSET $1 LIMIT $2", [startIndex, limit])
        const phones = newProducts.rows
        res.send(phones)
    } catch (err) {
        console.log(err)
    }
})

router.post('/', auth, async(req, res)=> {
    try {
        const {name, price, description, img} = req.body //dovde si stigao
        const uploadResponse = await cloudinary.uploader.upload(img, {
            folder: 'web-shop/phones',
        })
        const {public_id, url} = uploadResponse
        const newSmartphone = await pool.query("INSERT INTO smartphone (public_id, url, name, description, price) VALUES($1, $2, $3, $4, $5) RETURNING *", [public_id, url, name, description, price])
        const smartphone = newSmartphone.rows[0]
        res.send(smartphone)
    } catch (err) {
        console.log(err)
    }
})

router.post('/delete', auth, async(req, res)=> {
    try {
        const {pid} = req.body
        await cloudinary.uploader.destroy(pid, {
            folder: 'web-shop/phones',
        })
        await pool.query("DELETE FROM smartphone WHERE public_id = $1", [pid])
        res.send(pid)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router