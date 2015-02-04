define(['underscore'], function (_) {
    'use strict';

    var BusinessObjectsDefinition = function () {
        _.bindAll(this);
    };

    _.extend(BusinessObjectsDefinition.prototype, {
        Home: "home",
        System: "system",
        Solutions: "solutions",
        ClientSoftware: "clientsoftware",
        Services: "services",
        DeviceGroups: "devicegroups",
        Devices: "devices",
        Schedule: "schedule",
        Jobs: "jobs",
        Logs: "logs",
        Reports: "reports",
        EForms: "eforms",
        Licenses: "licenses",
        UsernamePassword: "username&password",
        Ldap: "ldap"
    });

    return new BusinessObjectsDefinition();
});
