// File: src/utils/setAuthToken.js
// This file will step up our token to be sent in out http headers.
// We will be send the token with every request we make.

// Import axios.
import axios from 'axios';

// Create our function.
// this function will take in a token.
const setAuthToken = token => {
  // check if there is token
  if(token){
    // If we have a token, ad the the token to our axios requests in the http header, under the property 'x-auth-token' : token
    axios.defaults.headers.common['x-auth-token'] = token;
    console.log("set token")
  } else {
    // If there is no token, or we don't have a token, remove the key value pair from the http headers.
    delete axios.defaults.headers.common['x-auth-token']
  }
}

// Export the function.
export default setAuthToken;