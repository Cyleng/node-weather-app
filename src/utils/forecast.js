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
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbility: body.currently.precipProbability
            })
        }
    })


}


module.exports = forecast