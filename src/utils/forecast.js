const request = require('request')

const forecast = (latitude, longtitude, callback) => {
  //const url = 'https://api.darksky.net/forecast/22dc7ba6aa32a72840824b31fbfb960b/' + latitude + ',' + longtitude
  const url = `http://api.weatherstack.com/current?access_key=216ad37f382c1f6f53196f5a2f701700&query=${latitude},${longtitude}`
  request({url, json: true}, (error, {body}) => {
    if (error)
      callback('Unable to connect', undefined)
    else if (body.error)
      callback('Unable to find location. Try another search.', undefined)
    else
      callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees out. There is '
              + body.current.precip + '% chance of rain.')
  })
}

module.exports = forecast
