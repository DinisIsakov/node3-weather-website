const path = require('path') 
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')
const partialsFooter = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerPartials(partialsFooter)

app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Dinis',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Dinis',
	})
})


app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'about',
		title: 'Help me',
		name: 'Dinis',
	})
})







app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		})
}
	
	geocode(req.query.address, (error, {latitude, langitude, location} = {}) => {
		if (error) {
			return res.send ({ error })
		} 
		
		forecast (latitude, langitude, (error, forecastData) => {

			if (error) {
				return res.send ({ error })
		}


		res.send({
			forecast: forecastData,
			location: location,
			address: req.query.address

			}) 
		}) 
	})
})


	


app.get('/products', (req, res) => {
	if (!req.query.search) {
		return	res.send({
			error: 'You must provide a search term'
		})
	} else {
		console.log(req.query.search)
		res.send({
			products: []
		})

	}

})




app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Dinis',
		errorMessage: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Dinis',
		errorMessage: 'Page not found'
	})
})

app.listen(port, () => {
	console.log('server up' + port)
})


