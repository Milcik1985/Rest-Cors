// Pasirašyt front-end applikaciją kuri pasiims iš backend'o sugeneruota id, bei jį atvaizduot browserio ekrane. // front end applikacija; zr App taking generated id
 fetch("http://localhost:3000/generate-id")
 .then((response) => {
     if(!response.ok) {
         throw new Error("Something wrong")
     }
     return response.json();
 })
 .then((response) => {
     console.log(response);
     document.body.innerHTML = response.id;
 })


