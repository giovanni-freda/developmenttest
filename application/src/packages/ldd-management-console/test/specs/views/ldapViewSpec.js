define(['../../../src/js/views/ldapView', '../../../src/js/models/ldapModel'], function (LdapView, LdapModel) {
    "use strict";

    describe('Ldap View', function () {

        describe('when Rendering', function () {
            var ldapView;
            var systemController = {};   
            beforeEach(function () {                            
                var ldapDataObj = {
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
                    secure : true,
                  };
                systemController.getLdapInfo = function(){
                    var ldapModel = new LdapModel(ldapDataObj);
                    return ldapModel;
                };
                
                systemController.saveLdapSettings = sinon.stub(); 
                
                ldapView = new LdapView({systemController : systemController});
            });

            it('should return ldap view', function () {
                var returnValue = ldapView.render();
                expect(returnValue).toBe(ldapView);                
            }); 
            
            it('should return ldap view data', function () {
                var returnValue = ldapView.render();               
                expect(returnValue.ldapData).not.toBe(null);
            }); 

            it('should update ldap settings', function () {                
                var settings = {target:{name:"some name"}};
                ldapView.updateLdapSettings(settings);
                
                expect(ldapView.ldapData).not.toBe(null);
            });         

            it('should cancel ldap settings', function () {                
                var view = ldapView.cancelLdapSettings();
                
                expect(ldapView).toBe(view);
            });

            it('should test ldap settings', function () {                
                var view = ldapView.testLdapSettings();
                expect(ldapView).toBe(view);
            }); 

            it('should save ldap settings', function () {                
                ldapView.saveLdap();
                expect(systemController.saveLdapSettings.calledOnce).toBeTruthy();
            });

            it('should save ldap settings success criteria', function () {  
                systemController.saveLdapSettings.callsArg(1);              
                ldapView.saveLdap();
                expect(systemController.saveLdapSettings.calledOnce).toBeTruthy();
            });  

            it('should save ldap settings error criteria', function () {  
                systemController.saveLdapSettings.callsArg(2);              
                ldapView.saveLdap();
                expect(systemController.saveLdapSettings.calledOnce).toBeTruthy();
            });
        });
    });
});
