var DataSetModule = require('./dataSetModule');
var SolutionModule = require('./solutionsModule');

exports.drawerData = [
];

function generateDeviceGroupsDrawerData() {
    var deviceGroupsDrawer = {
        name: "Device Groups",
        type: "BuisnessObject",
        children: [
        ]
    };

    var allDeviceGroups = {
        name: "All Device Groups",
        type: "ObjectAggregate",
        children: [
        ]
    };

    DataSetModule.deviceGroupData.forEach(function (value) {
        var newDeviceGroup = {
            name: value.name,
            type: "ObjectInstance",
            tasks: [
                {
                    "name": "Summary",
                    "uri": "devicegroups/summary",
                    "type": "task",
                    "id": value.id
                },
                {
                    "name": "Configuration",
                    "uri": "devicegroups/configuration",
                    "type": "task",
                    "id": value.id
                }
            ]
        };
        allDeviceGroups.children.push(newDeviceGroup);
    });

    deviceGroupsDrawer.children.push(allDeviceGroups);
    return deviceGroupsDrawer;
}

function generateSolutionsDrawerData() {
    var solutionsDrawer = {
        name: "Solutions",
        type: "BuisnessObject",
        children: [
        ]
    };

    var allSolutions = {
        name: "All Solutions",
        type: "ObjectAggregate",
        children: [
        ]
    };

    DataSetModule.solutionData.forEach(function (value) {
        var newSolution = {
            name: value.name,
            type: "ObjectInstance",
            tasks: [
                {
                    "name": "Summary",
                    "uri": "solution/summary",
                    "type": "task",
                    "id": value.id
                },
                {
                    "name": "Configuration",
                    "uri": "solution/configuration",
                    "type": "task",
                    "id": value.id
                }
            ]
        };
        allSolutions.children.push(newSolution);
    });

    solutionsDrawer.children.push(allSolutions);
    return solutionsDrawer;
}

function generateEFormsDrawerData() {
    var eFormsDrawer = {
        name: "EForms",
        type: "BuisnessObject",
        children: [
        ]
    };

    var allEForms = {
        name: "All EForms",
        type: "ObjectAggregate",
        children: [
        ]
    };

    DataSetModule.eFormData.forEach(function (value) {
        var newEForm = {
            name: value.name,
            type: "ObjectInstance",
            tasks: [
                {
                    "name": "Summary",
                    "uri": "eforms/summary",
                    "type": "task",
                    "id": value.id
                },
                {
                    "name": "Configuration",
                    "uri": "eforms/configuration",
                    "type": "task",
                    "id": value.id
                }
            ]
        };
        allEForms.children.push(newEForm);
    });

    eFormsDrawer.children.push(allEForms);
    return eFormsDrawer;
}

function generateDevicesDrawerData() {
    var devicesDrawer = {
        name: "Devices",
        type: "BuisnessObject",
        children: [
        ]
    };

    var allDevices = {
        name: "All Devices",
        type: "ObjectAggregate",
        children: [
        ]
    };

    DataSetModule.eFormData.forEach(function (value) {
        var newDevice = {
            name: value.name,
            type: "ObjectInstance",
            tasks: [
                {
                    "name": "Summary",
                    "uri": "devices/summary",
                    "type": "task",
                    "id": value.id
                },
                {
                    "name": "Configuration",
                    "uri": "devices/configuration",
                    "type": "task",
                    "id": value.id
                }
            ]
        };
        allDevices.children.push(newDevice);
    });

    devicesDrawer.children.push(allDevices);
    return devicesDrawer;
}

function generateSoftwareClientGroupsDrawerData() {
    var softwareClientGroupsDrawer = {
        name: "Software Client Groups",
        type: "BuisnessObject",
        children: [
        ]
    };

    var allSoftwareClientGroups = {
        name: "All Software Client Groups",
        type: "ObjectAggregate",
        children: [
        ]
    };

    DataSetModule.eFormData.forEach(function (value) {
        var newSoftwareClientGroup = {
            name: value.name,
            type: "ObjectInstance",
            tasks: [
                {
                    "name": "Summary",
                    "uri": "softwareclientgroups/summary",
                    "type": "task",
                    "id": value.id
                },
                {
                    "name": "Configuration",
                    "uri": "softwareclientgroups/configuration",
                    "type": "task",
                    "id": value.id
                }
            ]
        };
        allSoftwareClientGroups.children.push(newSoftwareClientGroup);
    });

    softwareClientGroupsDrawer.children.push(allSoftwareClientGroups);
    return softwareClientGroupsDrawer;
}

exports.generateDrawerData = function () {
    var drawerData = [];

    drawerData.push(generateSolutionsDrawerData());
    drawerData.push(generateDeviceGroupsDrawerData());
    drawerData.push(generateEFormsDrawerData());
    drawerData.push(generateDevicesDrawerData());
    drawerData.push(generateSoftwareClientGroupsDrawerData());
    return drawerData;
}


function send(req, res, next) {
    var drawerData = exports.generateDrawerData();
    if (req.params.id != undefined && req.params.id != "") {

        res.send(drawerData[req.params.id]);
    }
    else {
        res.send(drawerData);
    }
    return next();
}

exports.initEndpoint = function (restifyServer) {
    //Technically rest considers these different actions, that's why they are separated
    restifyServer.get('/drawers', send);
    restifyServer.get('/drawers/:id', send);
};           		
