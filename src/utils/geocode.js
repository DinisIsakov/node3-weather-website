const request = require('request')


const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?country=us&proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiZGluaXMxMiIsImEiOiJjbDFva3ZhcTMwMHo1M2tvNWZieDNuMjAzIn0.Qni085ZOM2_EvJhac4xRWg&limit=1'

	request ({ url: url, json: true }, (error, {body}) => {
		if (error) {
			callback ('no internet', undefined)
		} else if (body.features.length === 0) {
			callback ('no matching result, please try again', undefined)
		} else {
			callback (undefined, {	
				latitude: body.features[0].center[1],
				langitude: body.features[0].center[0],
				location: 'city ' + body.features[0].place_name 
			})
		}
	})
}





module.exports = geocode