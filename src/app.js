const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Jacques Leng'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Jacques Leng'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        helpText:'This is help page',
        name:'Jacques Leng'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address must be provided!"
        })
    } 
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        //console.log('q111')
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error})
            }
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: 'Help Error',
        errorMessage:'Help Artical Not Found',
        name:'Jacques Leng'
    })
})

app.get('*',(req, res)=>{
    res.render('error',{
        title: '404',
        errorMessage:'Page Not Found',
        name:'Jacques Leng'
    })
})
app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})
