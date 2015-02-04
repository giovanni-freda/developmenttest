define(['jquery', 'core', 'underscore', 'template!../../content/ldapView', '../systemController', './lddAlertContainer'],
    function ($, Core, _, LdapViewTemplate, SystemController, LddAlertContainer) {

            return Core.View.extend({                
                systemController: null,
                ldapData: null,
                changedData: {},
                alertContainer : null,

                domEvents: {
                   'click #ldapsave': 'saveLdap',
                   'click #cancelldapsettings': 'cancelLdapSettings',
                   'click #testsettings': 'testLdapSettings',
                   'keyup #ldapform input[type="text"]': 'updateLdapSettings',
                   'keyup #ldapform input[type="password"]': 'updateLdapSettings',
                   'change #ldapform select': 'updateLdapSettings',
                   'change #ldapform input[type="checkbox"]': 'updateLdapSettings',
                   'change #ldapform input[type="radio"]': 'updateLdapSettings'
                   
                },

                cancelLdapSettings: function(){                    
                    return this;
                },

                testLdapSettings: function(){                    
                    return this;
                },

                initialize: function( options ){
                	this.systemController = options.systemController || new SystemController({});
                    var successCallback = function(model){
                    };
                    var errorCallback = function(){
                    };
                    this.ldapData = this.systemController.getLdapInfo({}, successCallback, errorCallback);
                    this.alertContainer = options.alertContainer || new LddAlertContainer();                    
                },

                render: function(){                    
                    var modelData = this.ldapData.attributes;
                    if (modelData.enabled)
                        modelData.enabled = "checked"
                    if (modelData.secure)
                        modelData.secure = "checked"

                    LdapViewTemplate.renderToView(this, modelData);
                    this.$('#ldapsave').prop('disabled', true);

                    return this;
                },

                saveLdap: function(){                    
                    var alertContainer = this.alertContainer;
                    var ldapsaveElement = this.$('#ldapsave');
                    var successCallback = function (){
                        var successObject = {
                            message: "Ldap configuration successfully saved.",
                            type: 'success'
                        };
                        ldapsaveElement.prop('disabled', true);
                        alertContainer.showAlert(successObject);
                    };
                    var errorCallback = function (){                       
                        var errorObject = {
                            message: "Error in Ldap configuration save.",
                            type: 'error'
                        };
                        alertContainer.showAlert(errorObject);
                    };
                    this.systemController.saveLdapSettings(this.changedData, successCallback, errorCallback);
                    return this;
                },

                updateLdapSettings: function(e){
                    this.changedData[e.target.name] = e.target.value;
                    this.$('#ldapsave').prop('disabled', false);
                }
            });
});