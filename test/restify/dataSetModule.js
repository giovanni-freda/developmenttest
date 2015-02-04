exports.solutionDataSetSize = 60;

exports.solutionData = [];
exports.deviceData = [];
exports.eFormData = [];
exports.deviceGroupData = [];
exports.softwareClientGroupData = [];
exports.licenseData = [];
exports.userData = [];
exports.tokenData = [];

exports.resetAdminUser = resetAdminUser;
exports.resetTokenData = resetTokenData;
exports.ldapData = [];
exports.ldapData =  {
    id : 1,
    server : "directory.lex.lexmark.com",
    port : 389,
    usersearchfilter : "uid",  
    usersearchbase : "ou=Employees",
    groupsearchfilter : "uniquemember",
    groupsearchbase : "ou=Groups",
    groupidentifier : "lex",
    memberofgroups : "Domain Users",
    anonymous : true,
    username : "uid= ,ou=Employees,o=Lexmark",
    password : "passcode",
    searchbase : "o=Lexmark",
    enabled : true,
    secure : false,
  };

function addNewSolution(req,res,next) {
    console.log(req.body);
    res.send(true);
    return next();
}

function setDataSet(req,res,next) {
    fillDataset(0);
    fillDataset(req.params.size);
    res.send(200);
    return next();
}

function fillDataset(datasetSize) {
    FillData(datasetSize, exports.solutionData, generateRandomSolution);
    FillData(datasetSize, exports.licenseData, generateRandomLicense);
    FillData(datasetSize, exports.deviceGroupData, generateRandomDeviceGroup);
    FillData(datasetSize, exports.deviceData, generateRandomDevice);
    FillData(datasetSize, exports.eFormData, generateRandomEForm);
    FillData(datasetSize, exports.softwareClientGroupData, generateRandomSoftwareClientGroup);
    resetAdminUser();
    FillDataForLDAP(1, exports.ldapData, generateRandomLDAPData);
}

function FillDataForLDAP(datasetSize, objectArray, generationFunc){
        objectArray = generationFunc();
}

function FillData(datasetSize, objectArray, generationFunc) {
    for(var currentIndex = objectArray.length; currentIndex < datasetSize; currentIndex++) {
        var newSolution = generationFunc(currentIndex+1);
        objectArray.push(newSolution);
    }
    
    for(var currentSize = objectArray.length; currentSize > datasetSize; currentSize--) {
        objectArray.pop();
    }


}

function findIndexByName(dataSet, name) {
    var arrayLength = dataSet.length;
    for (var i = 0; i < arrayLength; i++) {
        if(dataSet[i].name == name) {
            return i;
        }
    }
    return -1;
}

function generateRandomSolution(newSolutionId) {
    console.log('Creating RandomSolution' + newSolutionId);
    var newSolution = {
        "name" : "RandomSolution1"+newSolutionId,
        "version":"VERSION INFO"+ newSolutionId,
        "installtime":"INSTALL TIME"+ newSolutionId,
        "updatetime":"UPDATE TIME"+ newSolutionId,
        deleteFailure: false,
        "devicegroups":[{
                "name":"DEVICE GROUP1 NAME"+ newSolutionId
                    },{
                "name":"DEVICE GROUP2 NAME"+ newSolutionId
                    },{
                "name":"DEVICE GROUP3 NAME"+ newSolutionId
                    },{
                "name":"DEVICE GROUP4 NAME"+ newSolutionId
                    },{
                "name":"DEVICE GROUP5 NAME"+ newSolutionId
                    },{
                "name":"DEVICE GROUP6 NAME"+ newSolutionId
                    }],
        "clientgroups":[{
                "name":"CLIENT GROUP NAME"+ newSolutionId
                     }],
         "eforms":  [{
                "author":"SOM"+ newSolutionId,
                "description":"DESCRIPTION"+ newSolutionId,
                "expirationdate":"EXPIRATION DATE"+ newSolutionId,
                "lastmodified":"LAST MODIFIED DATE"+ newSolutionId
                    }],
        "reports":"REPORT SUMMARY"+ newSolutionId,
        "esfapps":[{
                    "name":"ESF APP NAME"+ newSolutionId,
                    "version": "ESF VERSION INFO"+ newSolutionId
                }],
                "configs":[ {
                         "LDDName" :"GS_CONFIGURATION_NAME",
                         "name": "CONFIGURATION NAME"+ newSolutionId,
                         "defaultvalue":"VALUE"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": null,
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                          {
                         "LDDName" :"GS_CONFIGURATION_NAME_A",
                         "name": "CONFIGURATION NAME A"+ newSolutionId,
                         "defaultvalue":"VALUEA"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "inputfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                           {
                         "LDDName" :"GS_CONFIGURATION_NAME_B",
                         "name": "CONFIGURATION NAME B"+ newSolutionId,
                         "defaultvalue":"VALUEB"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUEB"+ newSolutionId,"VALUE_BB","VALUE_BBB"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "combobox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_C",
                         "name": "CONFIGURATION NAME C"+ newSolutionId,
                         "defaultvalue":"VALUEC"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUEC"+ newSolutionId,"VALUE_CC","VALUE_CCC"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "listbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_D",
                         "name": "CONFIGURATION NAME D"+ newSolutionId,
                         "defaultvalue":"true",
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "checkbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_E",
                         "name": "CONFIGURATION NAME E"+ newSolutionId,
                         "defaultvalue":"VALUEE"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "passwordfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_F",
                         "name": "CONFIGURATION NAME F"+ newSolutionId,
                         "defaultvalue":"VALUEF"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "inputfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                          {
                         "LDDName" :"GS_CONFIGURATION_NAME_G",
                         "name": "CONFIGURATION NAME G"+ newSolutionId,
                         "defaultvalue":"VALUEG"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "inputfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                           {
                         "LDDName" :"GS_CONFIGURATION_NAME_H",
                         "name": "CONFIGURATION NAME H"+ newSolutionId,
                         "defaultvalue":"VALUEH"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUEH"+ newSolutionId,"VALUE_HH","VALUE_HHH"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "combobox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_I",
                         "name": "CONFIGURATION NAME I"+ newSolutionId,
                         "defaultvalue":"VALUEI"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUEI"+ newSolutionId,"VALUE_II","VALUE_III"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "listbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_J",
                         "name": "CONFIGURATION NAME J"+ newSolutionId,
                         "defaultvalue":"true",
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "checkbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_K",
                         "name": "CONFIGURATION NAME K"+ newSolutionId,
                         "defaultvalue":"VALUEK"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "passwordfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                         },


                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_L",
                         "name": "CONFIGURATION NAME L"+ newSolutionId,
                         "defaultvalue":"VALUEL"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "inputfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                          {
                         "LDDName" :"GS_CONFIGURATION_NAME_M",
                         "name": "CONFIGURATION NAME M"+ newSolutionId,
                         "defaultvalue":"VALUEM"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "inputfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                           {
                         "LDDName" :"GS_CONFIGURATION_NAME_N",
                         "name": "CONFIGURATION NAME N"+ newSolutionId,
                         "defaultvalue":"VALUEN"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUEN"+ newSolutionId,"VALUE_NN","VALUE_NNN"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "combobox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_O",
                         "name": "CONFIGURATION NAME O"+ newSolutionId,
                         "defaultvalue":"VALUEO"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUEO"+ newSolutionId,"VALUE_OO","VALUE_OOO"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "listbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_P",
                         "name": "CONFIGURATION NAME P"+ newSolutionId,
                         "defaultvalue":"true",
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "checkbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_Q",
                         "name": "CONFIGURATION NAME Q"+ newSolutionId,
                         "defaultvalue":"VALUEQQ"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "passwordfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_R",
                         "name": "CONFIGURATION NAME R"+ newSolutionId,
                         "defaultvalue":"VALUER"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "inputfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                          {
                         "LDDName" :"GS_CONFIGURATION_NAME_S",
                         "name": "CONFIGURATION NAME S"+ newSolutionId,
                         "defaultvalue":"VALUES"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "inputfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                          },
                           {
                         "LDDName" :"GS_CONFIGURATION_NAME_T",
                         "name": "CONFIGURATION NAME T"+ newSolutionId,
                         "defaultvalue":"VALUET"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUET"+ newSolutionId,"VALUE_TT","VALUE_TTT"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "combobox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_U",
                         "name": "CONFIGURATION NAME U"+ newSolutionId,
                         "defaultvalue":"VALUEU"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": ["VALUEU"+ newSolutionId,"VALUE_UU","VALUE_UUU"],
                              "possibleValuesWithDisplayStrings": null,
                              "type": "listbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_V",
                         "name": "CONFIGURATION NAME V"+ newSolutionId,
                         "defaultvalue":"true",
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "checkbox"
                          }
                         },
                         {
                         "LDDName" :"GS_CONFIGURATION_NAME_W",
                         "name": "CONFIGURATION NAME W"+ newSolutionId,
                         "defaultvalue":"VALUEW"+ newSolutionId,
                         "descriptor": {
                              "possibleValues": null,
                              "possibleValuesWithDisplayStrings": null,
                              "type": "passwordfield",
                              "max": 0,
                              "min": 0,
                              "required": false,
                              "patternMatch": null
                          }
                         }             
                        ],
                "securitysetupfiles":[{
                            "name": "SECURITY SETUP FILE NAME"+ newSolutionId,
                            "config":"UCF FILE CONTENT",
                            "devicetypes":[ {"type": "e-Task 2 "+ newSolutionId, "deployto":true},
                                            {"type": "e-Task 2+ "+ newSolutionId, "deployto":false},
                                            {"type": "e-Task 3 "+ newSolutionId, "deployto":false},
                                            {"type": "e-Task 4 "+ newSolutionId, "deployto":false}]},
                            {
                            "name": "SECURITY SETUP FILE NAME"+ newSolutionId + "A",
                            "config":"UCF FILE CONTENT A",
                            "devicetypes":[ {"type": "e-Task 2 "+ newSolutionId + "A", "deployto":false},
                                            {"type": "e-Task 2+ "+ newSolutionId + "A", "deployto":true},
                                            {"type": "e-Task 3 "+ newSolutionId + "A", "deployto":false},
                                            {"type": "e-Task 4 "+ newSolutionId + "A", "deployto":false}]},
                            {
                            "name": "SECURITY SETUP FILE NAME"+ newSolutionId + "B",
                            "config":"UCF FILE CONTENT B",
                            "devicetypes":[ {"type": "e-Task 2 "+ newSolutionId + "B", "deployto":false},
                                            {"type": "e-Task 2+ "+ newSolutionId + "B", "deployto":false},
                                            {"type": "e-Task 3 "+ newSolutionId + "B", "deployto":true},
                                            {"type": "e-Task 4 "+ newSolutionId + "B", "deployto":false}]},
                            {
                            "name": "SECURITY SETUP FILE NAME"+ newSolutionId + "C",
                            "config":"UCF FILE CONTENT C",
                            "devicetypes":[ {"type": "e-Task 2 "+ newSolutionId + "C" , "deployto":false},
                                            {"type": "e-Task 2+ "+ newSolutionId + "C", "deployto":false},
                                            {"type": "e-Task 3 "+ newSolutionId + "C" , "deployto":false},
                                            {"type": "e-Task 4 "+ newSolutionId + "C" , "deployto":true}]}
                            ]
}
    
    return newSolution;
}

function generateRandomDeviceGroup(newDeviceGroupId) {
    console.log('Creating Random Device Group #' + newDeviceGroupId);
    var solutions = [];
    if((newDeviceGroupId%10) == 0) {
        console.log("1st of 10, attaching solution")
        var solutionIndexToUse = newDeviceGroupId;
        if(solutionIndexToUse >= exports.solutionData.length) {
            solutionIndexToUse -= exports.solutionData.length;
            console.log("More device groups then solutions, so rebounding solution index to: " + solutionIndexToUse)
        }
        solutions.push(exports.solutionData[solutionIndexToUse]);
    }


    var newDeviceGroup = {
        id : newDeviceGroupId,
        name : "Random Device Group #" + newDeviceGroupId,
        solutions : solutions
    }
    return newDeviceGroup;
}

function generateRandomDevice(newDeviceId) {
    console.log('Creating Random Device #' + newDeviceId);
    var newDevice = {
        id : newDeviceId,
        name : "Random Device #" + newDeviceId
    }
    return newDevice;
}

function generateRandomEForm(newEFormId) {
    console.log('Creating Random EForm #' + newEFormId);
    var newEForm = {
        id : newEFormId,
        name : "Random EForm #" + newEFormId,
        
    }
    return newEForm;
}

function generateRandomLicense(newEFormId) {
    console.log('Creating Random License #' + newEFormId);
    var newLicense = {
        id : newEFormId,
        featureid:"BSS.LDD.Server #"+ newEFormId,
        expirationdate:"2014-12-31 00:00:00.0",
        numberoflicense:"unlimited",
        sign:"sign"+ newEFormId,
        checkoutcount: newEFormId,
        type:"demo",
        loadbalancerip:"loadbalancerip"+ newEFormId
    }
    return newLicense;
}

function generateRandomLDAPData(){
  console.log('generating LDAP random data');

  var ldapInfo = {
    id : 1,
    server : "directory.lex.lexmark.com",
    port : 389,
    usersearchfilter : "uid",  
    usersearchbase : "ou=Employees",
    groupsearchfilter : "uniquemember",
    groupsearchbase : "ou=Groups",
    groupidentifier : "",
    memberofgroups : "Domain Users",
    anonymous : true,
    username : "uid= ,ou=Employees,o=Lexmark",
    password : "",
    searchbase : "o=Lexmark",
    enabled : true,
    secure : false,
  }
  return ldapInfo;
}
function generateRandomSoftwareClientGroup(newSoftwareClientGroupId) {
    console.log('Creating Random Software Client Group #' + newSoftwareClientGroupId);
    var newSoftwareClientGroup = {
        id : newSoftwareClientGroupId,
        name : "Random Software Client Group #" + newSoftwareClientGroupId
    }
    return newSoftwareClientGroup;
}

function resetAdminUser() {
    exports.userData = [];
    exports.userData.push(generateSingleUser('admin', 'admin'));
}

function resetTokenData() {
    exports.tokenData = [];
}

function generateSingleUser(username, password) {
    var newUser = {
        userId : username,
        password : password
    };
    console.log('Creating new user ID = ' + newUser.userId + ' PWD = ' + newUser.password);
    return newUser;
}

exports.initEndpoint = function(restifyServer) {
  fillDataset(exports.solutionDataSetSize);
  
  //Technically rest considers these different actions, that's why they are separated
  restifyServer.put('/datasetSize/:size', setDataSet);
};

exports.deleteSolution = function(solutionName) {
    var solutionToDeleteIndex = findIndexByName(exports.solutionData, solutionName);
    console.log("solutionToDeleteIndex: " + solutionToDeleteIndex);
    if(solutionToDeleteIndex != - 1 && !exports.getSolution(solutionName).deleteFailure) {
        exports.solutionData.splice(solutionToDeleteIndex, 1)
        return true;
    }
    else
        return false;
}

exports.getSolution = function(solutionName) {
    console.log(solutionName);
    var solutionIndex = findIndexByName(exports.solutionData, solutionName)
    console.log(solutionIndex);

    return exports.solutionData[solutionIndex]
}
