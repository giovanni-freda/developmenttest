var dataSetModule = require('./dataSetModule');
var restify = require('restify');
var backendConfig = require('./backendConfig');
var authModule = require('./authenticationModule');

module.exports = {
    validateRequestToken : function(req, res, next) {
        console.log('validateRequestToken was called for ' + req.url);
        if (req.url.indexOf('/lmc/rws/restauth/v1/token') > -1 ||
            req.url.indexOf(backendConfig.testUrl) > -1 ||
            req.url.indexOf('/datasetSize/') > -1 ) {
            console.log('    Debug API ' + req.url + ' token authentication not required');
            return (next());
        } else {
            authModule.validateTokenOrUnauthorized(req, res, next, 'Failed token validation for url ' + req.url)
            return (next());
        }
    }

};

