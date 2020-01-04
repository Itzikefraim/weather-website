const request = require('request')

// find latitude and longtitude with a location name
const geocode = (address, callback) => {
  const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXR6aWtlZnJhaW0iLCJhIjoiY2s0czcycmE5MGlxZTNrcWQyaTNxNm9iMyJ9.6cAb-AE-MuGD7ktRJopUww'

  request({url, json: true}, (error, {body}) => {
    if (error)
      return callback('Unable to connect', undefined)
    else if (body.message || body.features.length === 0)
      return callback('Unable to find location. Try another search.', undefined)
    else
      return callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
  })
}



module.exports = geocode
