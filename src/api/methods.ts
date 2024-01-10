// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };
  
//   fetch("api.coincap.io/v2/assets", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));


import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coincap.io/v2/",
});


export const methods = {
    getCoins() {
        return api.get("assets");  
    },
    getCoin(id: string) {
        return api.get(`assets/${id}`);  
    }
}