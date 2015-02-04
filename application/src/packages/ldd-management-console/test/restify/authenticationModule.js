var dataSetModule = require('./dataSetModule');
var restify = require('restify');
var backendConfig = require('./backendConfig');

exports.validateTokenOrUnauthorized = validateTokenOrSendUnauthorized;
exports.changeAdminUserName = changeAdminUserName;
exports.changeAdminPassword = changeAdminPassword;
exports.getAdminUserData = getAdminUserData;

function send(req, res, next) {

    if (req.params.id != undefined && req.params.id != "") {

        res.send(dataSetModule.exports.licenseData[req.params.id]);
    }
    else {
        res.send(dataSetModule.exports.licenseData);
    }
    return next();
}

function authenticateUser(req, res, next){
    console.log('authenticateUser called.');

    console.log('    Setting header[Cache-Control] = no-cache');
    res.cache('no-cache');

    if (!verifyJSessionIdOrSendUnavailable(req, res)) {
        return next();
    }

    if (typeof req.username == 'undefined') {
        sendNotAuthorized('   No user credentials sent', res);
        return next();
    }

    if (req.username == 'anonymous') {
        sendNotAuthorized('   User ' + req.username + ' is not allowed', res);
        return next();
    }

    var userData = findUserById(req.username);
    if (!userData) {
        sendNotAuthorized('No user information found for ' + req.username, res);
        return next();
    }

    if (req.authorization.basic.password !== userData.password) {
        sendNotAuthorized('User credentials ' + req.authorization.basic.password + ' incorrect for ' + req.username, res);
        return next();
    }

    var tokenData = createNewToken();
    dataSetModule.tokenData.push(tokenData);

    console.log('Ceating authentication token for user : [' + userData.userId + '] token : [' + tokenData.token + '] expires : [' + tokenData.expiration + ']');
    res.send({access_token : tokenData.token});

    return next();
}

function sendNotAuthorized(message, res) {
    console.log(message + ' : 401');
    res.send(401, {code : 401, message : message});
}

function verifyJSessionIdOrSendUnavailable(req, res){
    if (!backendConfig.requireJSessionId) {
        console.log('No JSESSIONID check performed due to backend configuration');
        return true;
    }

    var cookies = req.cookies;
    if (cookies.JSESSIONID) {
        return true
    }
    else {
        var msg = '    required JSESSIONID cookie is missing';
        console.log(msg);
        res.send(503, {code:503, message:msg});
        return false
    }
}

function createNewToken() {
    var expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + backendConfig.tokenExpirationMinutes);
    var randomToken = "randomToken_" + Math.floor((Math.random() * 1000) + 1);

    var tokenData = {
        token : randomToken,
        expiration : expiresAt
    };
    return tokenData;
}

function validateToken(req, res, next){
    console.log('validateToken called.');

    console.log('    Setting header[Cache-Control] = no-cache');
    res.cache('no-cache');

    if (isTokenValid(req, res, next)) {
        console.log('    Token was valid');
        res.send(true);
    } else {
        console.log('    Token was invalid or expired');
        res.send(200, 'false');
    }

    return next();
}

function validateTokenOrSendUnauthorized(req, res, next, msg){
    console.log('validateTokenOrSendUnauthorized called.');
    if (isTokenValid(req, res, next)) {
        return true;
    } else {
        console.log('    Token was invalid or expired');
        sendNotAuthorized(msg, res);
        return false;
    }
}


function isTokenValid(req, res, next){
    if (!backendConfig.requireAuthentication) {
        console.log('No authentication check performed due to backend configuration');
        return true;
    }

    var token = req.header('Authorization');
    if (token) {
        var components = token.split(' ');
        if (components[0] === 'Bearer') {
            token = components[1];
        }
        else {
            token = null;
        }
    }
    else {
        token = req.params['access-token'];
    }

    if (!token) {
        return false;
    }

    var tokenData = findTokenData(token);
    if (!tokenData) {
        return false
    }
    var currentDate = new Date();
    return currentDate <= tokenData.expiration;
}

function findUserById(userId){
    console.log('    Looking up user with ID  ' + userId);

    var arrayLength = dataSetModule.userData.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log('        found user  ' + dataSetModule.userData[i].userId);
        if(dataSetModule.userData[i].userId == userId){
            console.log('    A matching user was found');
            return dataSetModule.userData[i];
        }
    }
    console.log('    No information found for user  ' + userId);
}

function findTokenData(token){
    var arrayLength = dataSetModule.tokenData.length;
    for (var i = 0; i < arrayLength; i++) {
        if(dataSetModule.tokenData[i].token == token){
            console.log('Found a token for access_token ' + token);
            return dataSetModule.tokenData[i];
        }
    }

    console.log('No token found matching access_token ' + token);
}

function resetAdminUser(req, res, next){
    console.log('DEBUG: resetAdminUser called.');
    dataSetModule.resetAdminUser();
    res.send(true);
    return next();
}

function resetTokenData(req, res, next){
    console.log('DEBUG: resetTokenData called.');
    dataSetModule.resetTokenData();
    res.send(true);
    return next();
}

function changeAdminUserName(newname) {
    var user = dataSetModule.userData[0];
    user.userId = newname;
    return true;
}

function changeAdminPassword(newpass) {
    var user = dataSetModule.userData[0];
    user.password = newpass;
    return true;
}

function getAdminUserData() {
    return dataSetModule.userData[0];
}

exports.initEndpoint = function (restifyServer) {
    console.log('Authentication module has been initialized');
    restifyServer.get(backendConfig.serverUrl + 'restauth/v1/token', authenticateUser);
    restifyServer.get(backendConfig.serverUrl + 'restauth/v1/token/validate', validateToken);
    restifyServer.put(backendConfig.testUrl + 'restauth/resetadmin', resetAdminUser);
    restifyServer.put(backendConfig.testUrl + 'restauth/resettokens', resetTokenData);

};



