
const request = require('request')




const forecast = (latitude, langitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=d952545792652d89bd602fca9794d7c8&query=' + latitude  + ',' +  langitude + '&units = f'

	request ({ url, json: true }, (error, {body}) => {
		if (error) {
			callback ('no internet', undefined)
		} else if (body.error) {
			callback ('no matching result, please try again', undefined)
		} else {
			callback (undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degres out')
		}
	})
}



module.exports = forecast