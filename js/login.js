import * as constants from './const.js'
import { displayUserInfo } from './userInterface.js';

export function login() {
    //? Check if fields are not empty
    if((constants.textInput.value.length) < 1 || (constants.passInput.value.length) < 1) {
        alert('Please fill in all fields');
        return;
    }

    //? Call auth function
    auth(constants.textInput.value, constants.passInput.value)
    console.log(constants.textInput.value);
    console.log(constants.passInput.value);
}

export function auth (username, password) {
    //? Create user object
    const user = {
        username: username,
        password: password
    }
    console.log("🚀 ~ auth ~ user:", user)

    const userStringify = JSON.stringify(user);

    //? Encode user object to base64 asciip
    const bToA = btoa(username + ':' + password);

    //? Fetch On API sign in url with bToA as Authorization header and user object
    fetch(constants.ApiSignin, {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer ' + bToA 
        },
    })
    .then(response => {
        //? Check response if err
        if(!response.ok){
            if(response.status === 401) {
                alert('Invalid username or password');
            }else{
                alert('An error has occured');
            }       
            throw new Error(`Erreur : ${response.status}`);    
        }
        console.log("🚀 ~ auth ~ response:", response)
        //? Return response as json if no err
        
        localStorage.setItem('user', userStringify);

        return response.json()
    })
    //? Get data from response
    .then(data => {
        console.log("🚀 ~ auth ~ data:", data)
        constants.content_type.Authorization = 'Bearer ' + data;
        //? Call getData function to get user info
        getData()
        .then(() => console.log("Donnée récupérée"))
        .catch(err => console.log("🚀 ~ auth ~ err:", err))
    })
    .catch(err => console.log("🚀 ~ auth ~ err:", err))
}

async function getData () {
    constants.param.body = JSON.stringify(constants.queryRequest)
    const response = await fetch ( constants.apiGraphQLUrl , constants.param)
    const data = await response.json()
    console.log("🚀 ~ getData ~ data:", data)
    displayUserInfo(data)
}
