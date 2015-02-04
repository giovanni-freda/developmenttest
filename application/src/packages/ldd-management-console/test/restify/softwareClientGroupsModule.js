var dataSetModule = require('./dataSetModule');

function send(req, res, next) {

    if (req.params.id != undefined && req.params.id != "") {

        res.send(dataSetModule.exports.softwareClientGroupsData[req.params.id]);
    }
    else {
        res.send(dataSetModule.exports.softwareClientGroupsData);
    }
    return next();
}


exports.initEndpoint = function (restifyServer) {
    //Technically rest considers these different actions, that's why they are separated
    restifyServer.get('/softwareclientgroups/:id', send);
    restifyServer.get('/softwareclientgroups', send);
};