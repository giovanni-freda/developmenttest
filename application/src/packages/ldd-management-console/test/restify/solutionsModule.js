var dataSetModule = require('./dataSetModule');
var backendConfig = require('./backendConfig');

function deleteSolution (req, res, next) {
    var result = dataSetModule.deleteSolution(req.params.name);
    console.log("delete solution result: " + result);
    if(result)
        res.send(204, {});
    else {
        console.log("failure");
        res.send(500);
    }

    return next();
}

function send(req, res, next) {
    //console.log("solutions::send id::" + req.params.id || "All");
    debugger;
    res.cache("public", {maxAge: 0});
    if(req.params.id != undefined && req.params.id != "")   
    { 
        res.send(dataSetModule.solutionData[req.params.id]);
    }
    else if(req.params.name != undefined && req.params.name != "")  
    {
        console.log("bb" + req.params.name);
        res.send(findSolutionByName(req.params.name));
    }
    else {
        res.send(dataSetModule.solutionData);
    }
    return next();
}

function addNewSolution(req,res,next) {
    dataSetModule.addNewSolution();
    res.send(true);
    return next();
}

function putSecurityFile(req, res, next){
    var solution = findSolutionByName(req.params.solutionName);
    if(solution != null){
        var securityFiles = solution.securitysetupfiles;
        
        for(var i=0; i < securityFiles.length; i++){
            console.log("sf: " + securityFiles[i].name);
            console.log("rq: " + req.params.filename);
            if(securityFiles[i].name == req.body.name){
                securityFiles[i] = req.body;
            }
        }
    }
    
    res.send("great!");
        
    return next();
}

function putConfigSettings(req, res, next){
     console.log("Put Config Settings");
    var solution = findSolutionByName(req.params.solutionName);
    if(solution != null){
        var configSettings = solution.configs;
        var changeSettings = req.body;
        console.log("cs: " + JSON.stringify(changeSettings));
      
        for(var i=0; i < configSettings.length; i++){
            console.log("cs: " + configSettings[i].LDDName);

            var key;
            
            for ( key in changeSettings) {              
                if(configSettings[i].LDDName == key){
                    console.log("cs1: " + key);
                    console.log("cs1 new value: " + changeSettings[key][0]);
                    console.log("cs1 old value: " +  configSettings[i].defaultvalue);
                    configSettings[i].defaultvalue = changeSettings[key][0];
                }
            }
        }
    }
    
    res.send("great!");
        
    return next();
}

function findSolutionByName(solutionName){
    var arrayLength = dataSetModule.solutionData.length;
    for (var i = 0; i < arrayLength; i++) {
        if(dataSetModule.solutionData[i].name==solutionName){
            return dataSetModule.solutionData[i];
        }
    }
}

function setDeleteFailure(req, res, next) {
    console.log("soluton name: " + req.params.solutionName );
    var solution = dataSetModule.getSolution(req.params.solutionName);
    solution.deleteFailure = true;
    res.send(true);
    return next();
}

function removeDeleteFailure(req, res, next) {
    var solution = dataSetModule.getSolution(req.params.solutionName);
    solution.deleteFailure = false;
    res.send(true);
    return next();
}

exports.initEndpoint = function(restifyServer) {
  //Technically rest considers these different actions, that's why they are separated
    restifyServer.get(backendConfig.serverUrl + 'solutions', send);
    restifyServer.get(backendConfig.serverUrl + 'solutions/:name', send);
    restifyServer.put(backendConfig.serverUrl + 'solutions/:solutionName/securitysetupfiles/:filename', putSecurityFile);
    restifyServer.del(backendConfig.serverUrl + 'solutions/:name' , deleteSolution);
    restifyServer.put(backendConfig.serverUrl + 'solutions/:solutionName/config', putConfigSettings);
    restifyServer.put(backendConfig.testUrl + 'solutions/:solutionName/deleteFailure', setDeleteFailure)
    restifyServer.del(backendConfig.testUrl + 'solutions/:solutionName/deleteFailure', removeDeleteFailure)
    restifyServer.get(backendConfig.testUrl + 'solutions/refresh', removeDeleteFailure)
};

exports.generateRandomSolution = function() {
    var solutionId = newSolution++;
    var newSolution = {
        id: solutionId,
        name: "Random Solution ( "+ solutionId + ") ",
        eforms: [ "joe"]
    } ;
    exports.solutionData.push(newSolution);
}