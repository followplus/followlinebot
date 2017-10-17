const express = require('express')

const app = express()

app.post('/webhook', (req, res) => {
  console.log(req);
  res.json({})
})

app.listen(8080)
