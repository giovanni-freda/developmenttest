var dataSetModule = require('./dataSetModule');
var authModule = require('./authenticationModule');
var backendConfig = require('./backendConfig');

function send(req, res, next) {

    if (req.params.id != undefined && req.params.id != "") {

        res.send(dataSetModule.exports.licenseData[req.params.id]);
    }
    else {
        res.send(dataSetModule.exports.licenseData);
    }
    return next();
}
function fetchLicenseInfo(req, res, next){
    console.log('fetchLicenseInfo called.');
    if (req.params.id != undefined && req.params.id != "") {

        res.send(dataSetModule.exports.licenseData[req.params.id]);
    }
    else {        
        res.send(dataSetModule.licenseData);
    }
    return next();
}


function putUsername(req, res, next){
    console.log("username: " + JSON.stringify(req.body));
    if (!req.body.username) {
        res.send(400, {code : 400, message : 'request body does not match specification'});
    }
    else {
        authModule.changeAdminUserName(req.body.username);
        res.send("Saved");
    }
    return next();
}

function putPassword(req, res, next){
    console.log("password: " + JSON.stringify(req.body));
    var adminuser = authModule.getAdminUserData();

    if (!req.body.currentpassword || !req.body.newpassword) {
        res.send(400, {code : 400, message : 'request body does not match specification'});
    }

    if (req.body.currentpassword != adminuser.password) {
        res.send(400, {code : 400, message : 'current password does not match for the user'});
    }
    else {
        authModule.changeAdminPassword(req.body.newpassword);
        res.send("Saved password");
    }
    return next();
}

function fetchLDAPInfo(req, res, next){
    console.log('fetch LDAP info called');

    res.send(dataSetModule.ldapData);
    return next();
}

function putLDAPInfo(req, res, next){
    console.log('put LDAP info called');
    console.log(req.body);
    var changedConfig = req.body;

    for ( key in changedConfig) {          
        console.log('key ---  '+key);
        console.log('old Value --- '+dataSetModule.ldapData[key]);
        console.log('value --- '+changedConfig[key]);
        dataSetModule.ldapData[key] = changedConfig[key];
        console.log('set new Value --- '+dataSetModule.ldapData[key]);
    }
    console.log('Changed LDAP module ---    '+JSON.stringify(dataSetModule.ldapData));
    res.send(dataSetModule.ldapData);
    //res.send('Got it!');
    next();
}


exports.initEndpoint = function (restifyServer) {
    //Technically rest considers these different actions, that's why they are separated    

    restifyServer.get('/lmc/rws/system/license', fetchLicenseInfo);
    restifyServer.put('/lmc/rws/system/username', putUsername);
    restifyServer.put('/lmc/rws/system/password', putPassword);
    restifyServer.get('/lmc/rws/system/ldapsettings', fetchLDAPInfo);
    restifyServer.put('/lmc/rws/system/ldapsettings', putLDAPInfo);
};
