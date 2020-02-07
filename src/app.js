const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./util/geocode.js')
const forecast = require('./util/forecast.js')

// variable to start express
const app = express()

// set static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar
app.set('view engine', 'hbs')
// views location
app.set('views', viewsPath)
// configure partial with handle bar
hbs.registerPartials(partialsPath)

// setting public folder to access for EXPRESS server
app.use(express.static(publicDirectoryPath))

// display hbs page from view folder same as route name ('' = index.hbs)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Binjan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Binjan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Binjan',
        message: 'Sunny day'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        title: 'Products',
        name: 'Binjan',
        products: []
    })
})

// display html page from public folder same as route name ('' = index.html)
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Binjan',
//         age: 42
//     },{
//         name: 'Ramanan',
//         age: 43
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

// start express on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})