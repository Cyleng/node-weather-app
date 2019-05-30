const request = require ('request')

const forecast = (latitude, longitude, callback)=> {
    const url = 'https://api.darksky.net/forecast/c4ac23af6602d9163b757f43dd925539/'+latitude+','+longitude
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather server', undefined)
        }else if (body.error){
            callback(body.error, undefined)
        }else {
            callback(undefined,{
                summary: body.daily.summary,
                temperature: body.currently.temperature,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureLow: body.daily.data[0].temperatureLow
            })
        }
    })


}


module.exports = forecast