// 1. Isirašyti express framework;
// is https://www.npmjs.com/package/express kopinam: npm i express terminale. package.json -> "scriptsirasom: "start": "node index.js", importuojam: 

const express = require('express')
const app = express()
const axios = require("axios")

// 6. Applikacijoje įrašyt cors biblioteką kuri leis front-end applikacijoms kreiptis į backend serverį;
const cors = require('cors')
const { v4: uuidv4 } = require("uuid");

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})
// 4. Pasirašy endpointą kuris gražina miestą bei to miesto orų prognozės objektą;

const weatherApiUrlBase = "GET /places/{place-code}/forecasts"

app.get("/city-weather", async (req, res)=>{
    const city = req.query.city;
    if(!city) {
        return res.status(400).send("city query parameter is required")
    }

    const weatherApiUrl = `${weatherApiUrlBase}/${city}/forecasts`
    
    try {
    const response = await axios.get(weatherApiUrl)
    res.json(response.data)
}catch(error) {
    res.status(500).send("An error ocured while fetching the weather data")
}
})



// 3. Per thunder client kreiptis į endpointą bei gauti atgal duomenis;
// ThunderClient-> GET -> http://localhost:3000/
// 5. Pasirašyt endpointą kuris gražiną sugeneruota id; // naudot uuid lib.
app.get("/generate-id", function(req, res){
    const newId = uuidv4(); 
// 8. Pasitobulint savo endpointą. kad prieš gražinant sugeneruota id jį taip pat atspauzdintu backendo consolė;
    console.log(newId)
    res.setHeader("Content-type", "application/json");
    res.send(JSON.stringify({id: newId}))
}) 
// arba
// app.get("/getGeneratedId", function (req, res) {
//     res.json({ id: uuidv4() });
//   });

// 2. Pasileisti savo serverį;
app.listen(3000, ()=> {
    console.log("server is listening")
})

// 7. Pasirašyt front-end applikaciją kuri pasiims iš backend'o sugeneruota id, bei jį atvaizduot browserio ekrane. // front end applikacija; zr App taking generated id
// nepamiršt killint bei iš naujo runnint applikacijos