exports.initEndpoint = function(restifyServer) {
  var DataSetModule = require('./dataSetModule');
  var UserModule = require('./userModule');
  var SolutionsModule = require('./solutionsModule');
  var DrawerModule = require('./drawerModule');
  var EFormsModule = require('./eFormsModule');
  var DeviceGroupsModule = require('./deviceGroupsModule');
  var DevicesModule = require('./devicesModule');
  var SoftwareClientGroupsModule = require('./softwareClientGroupsModule');
  var SystemModule = require('./systemModule');
  var AuthenticationModule = require('./authenticationModule');

  DataSetModule.initEndpoint(restifyServer);
  UserModule.initEndpoint(restifyServer);
  SolutionsModule.initEndpoint(restifyServer);
  DrawerModule.initEndpoint(restifyServer);
  EFormsModule.initEndpoint(restifyServer);
  DeviceGroupsModule.initEndpoint(restifyServer);
  DevicesModule.initEndpoint(restifyServer);
  SoftwareClientGroupsModule.initEndpoint(restifyServer);
  SystemModule.initEndpoint(restifyServer);
  AuthenticationModule.initEndpoint(restifyServer);
};
