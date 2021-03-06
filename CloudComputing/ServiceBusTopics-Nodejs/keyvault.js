'use strict';
var keyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;

var clientId = 'YOURCLIENTID';
var clientSecret = 'YOURSECRET';

var secretIdentifier = 'YOURKEYVAULT';

var credentials = new keyVault.KeyVaultCredentials(authenticator);
var client = new keyVault.KeyVaultClient(credentials);


module.exports = {

    
    getSecretPromise: function(){
        return new Promise(function(resolve,reject){
            client.getSecret(secretIdentifier)
                .then(function(result){
                    resolve(result.value)
                })
                .catch(function(error){
                    reject(error);
                });                
        });
    }

};


// Authenticator - retrieves the access token
function authenticator(challenge, callback) {

  // Create a new authentication context.
  var context = new AuthenticationContext(challenge.authorization);

  // Use the context to acquire an authentication token.
  return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function (err, tokenResponse) {
    if (err) throw err;
    // Calculate the value to be set in the request's Authorization header and resume the call.
    var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;
    return callback(null, authorizationValue);
  });

};