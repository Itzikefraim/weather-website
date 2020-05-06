// server side

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const htmlPath = path.join(__dirname, '../public')
// hbs is looking for file named views in the root directory
// this way we can change the name of the directory and still
// use hbs. we creating a path to the folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
// here we use the path we created and we tell hbs to look for that path
// instead of views folder
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(htmlPath))



app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Itzik'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Itzik'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMes: 'For any questions contact me @ Itzikefraim6@gmail.com',
    title: 'Help',
    name: 'Itzik'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({
      error: 'You must provide an address'
    })

  geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        location,
        forecastData: forecastData,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    })
  } else{

    res.send({
      products: []
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: 'Page 404',
    body: 'Help article not found',
    name: 'Itzik'
  })})

app.get('*', (req, res) => {
  res.render('404',{
    title: 'Page 404',
    body: 'Page not found',
    name: 'Itzik'
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port + '.')
})
