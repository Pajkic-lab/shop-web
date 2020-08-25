const express = require('express')
const router = express.Router()
require('dotenv').config()
const { check, validationResult } = require('express-validator')
const pool = require('../db')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')


router.post('/', [
    check('email', 'precise email adres is required').isEmail(),
    check('password', 'password has to be 6 characters long').isLength({min: 6})
  ], async(req, res)=> {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.errors[0].msg })
      }
      const {email, password} = await req.body
      try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
          if(user.rows.length < 1) {
              return res.status(400).json({ error: 'Invalide credentials' })
          }
           if(password !== user.rows[0].password) {
              return res.status(400).json({ error: 'Invalide credentials' })
          }  
          const paylod = { user: { id: user.rows[0].id }}
            jwt.sign(paylod, process.env.JWT_SECRET, (err, token)=> {
             if(err) throw err
             res.json({ token })
            })
      } catch (err) {
        console.log(err)
      }
  })

router.get('/', auth, async(req, res)=>{
  const id = req.user.id
  try {
    const newUser = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    const user = {
      id: newUser.rows[0].id,
      email: newUser.rows[0].email
    }

    res.send(user)
  } catch (err) {
    console.log(err)
  }
})



module.exports = router