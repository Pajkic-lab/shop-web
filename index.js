const express = require('express')
const app = express()
const cors = require("cors")
const path = require('path')
const PORT = process.env.PORT || 5000



app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



if(process.env.NODE_ENV === "production") {
    app.use("/", express.static("./client/build")) 
  }


  //Routes
  app.use('/auth', require('./routes/user'))
  app.use('/smartphones', require('./routes/smartphones'))
  app.use('/product', require('./routes/product'))
  app.use('/email', require('./routes/email'))
  


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))    
  })


  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})