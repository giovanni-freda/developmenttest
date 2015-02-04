define(['../../../src/js/systemController', 'core', '../../../src/js/eventAggregator', '../../../src/js/models/licenseModel', '../../../src/js/models/usernameModel' ,'../../../src/js/models/passwordModel','../../../src/js/models/licenseCollection'], 
    function (SystemController, Core, EventAggregator, LicenseModel,UsernameModel,PasswordModel, LicenseCollection) {

    "use strict";

    describe('System Controller', function () {

        var systemController;       
        var licenseCollection = {};
        var options = {};
        var ldapModel = {};

        var licenseInfo = [{  id : 1,
                            featureid:"undefined",
                            expirationdate:"undefined",
                            numberoflicense:"undefined",
                            sign:"undefined",
                            checkoutcount:"undefined",
                            type:"undefined",
                            loadbalancerip:"undefined"},
                            {  id : 2,
                            featureid:"undefined",
                            expirationdate:"undefined",
                            numberoflicense:"undefined",
                            sign:"undefined",
                            checkoutcount:"undefined",
                            type:"undefined",
                            loadbalancerip:"undefined"}];

        var ldapModelData = {
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
        };

        beforeEach(function () {
            licenseCollection.fetch = sinon.stub().returns(licenseInfo);
            options.licenseCollection = licenseCollection;
            ldapModel.fetch =  sinon.stub().returns(ldapModelData);
            ldapModel.save =  sinon.stub().returns(ldapModelData);

            options.ldapModel = ldapModel;
            systemController = new SystemController(options);
        });

        describe('should get display columns', function () {
            it('should fetch columns', function () {                
                var columns = systemController.getLicenseGridColumns();                
                expect(columns).not.toBe(null);                
            });
        });

        describe('should get licenseModel', function () {
            it('should call fetch', function () {                
                var data = systemController.getLicenseInfo({});                
                expect(licenseCollection.fetch.calledOnce).toBeTruthy();
                expect(data).not.toBe(null);                
            });
        });

        describe('should get licenseModel on error', function () {
            var errorCallback;
            beforeEach(function () {
                systemController = new SystemController({});                
                
                errorCallback = sinon.spy();
                systemController.on("error", errorCallback);    
            });
            afterEach(function(){
                systemController.off("error", errorCallback);
                errorCallback = null;
            });

            it('should call fetch on error condition', function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];
                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                var successCallback = sinon.spy();   
                var errorCallback = sinon.spy();

                systemController.getLicenseInfo({}, successCallback, errorCallback);
               
                requests[0].respond(401, { "Content-Type": "application/json" },
                    '[{ "id": 1, "featureid":"undefined" }]');

                expect(errorCallback.calledOnce).toBeTruthy();
            });
        });

        describe('when a username PUT is requested', function(){
            it('should call the successCallback function', function(){
                var server = sinon.fakeServer.create();
                var successCallback = sinon.spy();
                var failureCallback = sinon.spy();
                server.respondWith("{}");
                var usernameModel = new UsernameModel();
                systemController.updateSystemUserName(usernameModel, successCallback, failureCallback);
                server.respond();
                expect(successCallback.calledOnce).toBeTruthy();
            });
            it('should call the failureCallback function', function(){
                var server = sinon.fakeServer.create();
                var successCallback = sinon.spy();
                var failureCallback = sinon.spy();
                server.respondWith([400, {}, "Bad Request"]);
                var usernameModel = new UsernameModel();
                systemController.updateSystemUserName(usernameModel, successCallback, failureCallback);
                server.respond();
                expect(failureCallback.calledOnce).toBeTruthy();
            });
            });


        describe('should work with LDAP', function () {
            it('should call ldap fetch', function () {                
                var data = systemController.getLdapInfo({});
                expect(ldapModel.fetch.calledOnce).toBeTruthy();
                expect(data).not.toBe(null);                
            });

            it('should call ldap save', function () {                
                var data = systemController.saveLdapSettings({});
                expect(ldapModel.save.calledOnce).toBeTruthy();
            });

            it('should call convertToGridRowDefinition', function () {
                var options = {};
                options.licenseCollection = {};
                options.licenseCollection.length = licenseInfo.length;
                options.licenseCollection.models = [];
                for(var i=0; i<licenseInfo.length;i++){
                    options.licenseCollection.models[i] = {};
                    options.licenseCollection.models[i].attributes = licenseInfo[i];
                }

                var systemController = new SystemController(options);
                var data = systemController.convertToGridRowDefinition();
                expect(data).not.toBe(null);
            });
            
        });

        describe('when a password PUT is requested', function(){
            it('should call the successCallback function', function(){
                var server = sinon.fakeServer.create();
                var successCallback = sinon.spy();
                var failureCallback = sinon.spy();
                server.respondWith("{}");
                var passwordModel = new PasswordModel();
                passwordModel.attributes.currentpassword="Old";
                passwordModel.attributes.newpassword="New";
                passwordModel.newretypedpassword="New";
                systemController.updateSystempassword(passwordModel, successCallback, failureCallback);
                server.respond();
                expect(successCallback.calledOnce).toBeTruthy();
            });
            it('should call the failureCallback function', function(){
                var server = sinon.fakeServer.create();
                var successCallback = sinon.spy();
                var failureCallback = sinon.spy();
                server.respondWith([400, {}, "Bad Request"]);
                var passwordModel = new PasswordModel();
                passwordModel.attributes.currentpassword="Old";
                passwordModel.attributes.newpassword="New";
                passwordModel.newretypedpassword="New";
                systemController.updateSystempassword(passwordModel, successCallback, failureCallback);
                server.respond();
                expect(failureCallback.calledOnce).toBeTruthy();
            });
        });
    });
});