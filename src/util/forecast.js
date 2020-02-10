const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5e69a03a14a7d85781a097ede9959f82/' 
        + latitude 
        + ',' 
        + longitude 
        + '?units=si&lang=en'

    request({url, json: true}, (error, { body } ) => {    
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {      
            callback(undefined, body.daily.data[0].summary    
                + ' It is currently ' 
                + body.currently.temperature 
                + ' degrees out there. There is a ' 
                + body.currently.precipProbability 
                + '% chance of rain. Today\'s high temprature will be '
                + temperatureHigh
                + ' and low temprature will be '
                + temperatureLow
                + '.')
        }
    })
}

module.exports = forecast
