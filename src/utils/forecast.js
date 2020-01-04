const request = require('request')

const forecast = (latitude, longtitude, callback) => {
  const url = 'https://api.darksky.net/forecast/22dc7ba6aa32a72840824b31fbfb960b/' + latitude + ',' + longtitude

  request({url, json: true}, (error, {body}) => {
    if (error)
      callback('Unable to connect', undefined)
    else if (body.error)
      callback('Unable to find location. Try another search.', undefined)
    else
      callback(undefined, body.hourly.summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is '
              + body.currently.precipProbability + '% chance of rain.')
  })
}

module.exports = forecast
