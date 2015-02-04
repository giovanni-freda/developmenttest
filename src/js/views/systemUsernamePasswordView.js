define(['jquery', 'core', 'underscore','template!../../content/systemUsernamePasswordView', '../systemController', './lddAlertContainer','./../models/usernameModel','./../models/passwordModel'],
    function ($, Core, _,SystemUsernamePasswordView, SystemController , LddAlertContainer,UsernameModel,PasswordModel) {

        "use strict";
               
        return Core.View.extend({
            alertContainer: null,
            domEvents: {
                   'click #applyUserName': 'applyUserName',
                   'click #resetUserName': 'resetUserName',
                   'click #applyPassword': 'applyPassword',
                   'click #resetPassword': 'resetPassword',
                   'change #txtusername': 'enableUserNameApply',
                   'change #txtretypeusername': 'setUsernametoModel',
                   'change #txtretypenewpassword': 'setPasswordtoModel',
                   'change #txtcurrentpassword': 'enablePasswordApply',
                },
            initialize: function (options) {
                  console.log('SystemUsernamePasswordView initialize');
                  this.systemController = options.systemController || new SystemController({});
                  this.alertContainer = options.alertContainer || new LddAlertContainer();
                 
                  
            },

            resetUserName: function(){
                  this.$('#txtusername').focus();
                  this.$('#txtretypeusername').val('');
                  this.$('#txtusername').val('');
                  this.$('#applyUserName').prop('disabled', true);
            },

            resetPassword: function(){
                  this.$('#txtcurrentpassword').focus();
                  this.$('#txtcurrentpassword').val('');
                  this.$('#txtnewpassword').val('');
                  this.$('#txtretypenewpassword').val('');
                  this.$('#applyPassword').prop('disabled', true);
            },

            enableUserNameApply:function(){
                  this.$('#applyUserName').prop('disabled', false);
            },

            enablePasswordApply:function(){
                  this.$('#applyPassword').prop('disabled', false);
            } ,

            setUsernametoModel:function(){
                 this.userNameModel = new UsernameModel();
                 this.userNameModel.set("username",this.$('#txtusername').val());
                 this.userNameModel.reTypeduserName = this.$('#txtretypeusername').val();
            } ,

            setPasswordtoModel:function(){
                 this.passwordModel = new PasswordModel();
                 this.passwordModel.set("currentpassword",this.$('#txtcurrentpassword').val());
                 this.passwordModel.set("newpassword",this.$('#txtnewpassword').val());
                 this.passwordModel.newretypedpassword = this.$('#txtretypenewpassword').val();
            } ,

            applyUserName: function(){
                  var alertContainer = this.alertContainer;
                  var userNameValid = this.userNameModel.isValid();
                  var successCallback = function() {
                  var alertOptionsSuccess = {
                      message: "Username updated Succesfully",
                      type: 'success'
                  };
                  alertContainer.showAlert(alertOptionsSuccess);
                   }
                      
                  var failureCallback = function() {
                  var alertOptionsFailure = {
                      message: "Failed to save Username",
                      type: 'error'
                  }
                  alertContainer.showAlert(alertOptionsFailure);
                  }
                  if (!userNameValid ) {
                    var alertUserName = {
                            message: this.userNameModel.validationError,
                            type: 'error'
                        };
                      alertContainer.showAlert( alertUserName );
                  }
                  else {
                      this.systemController.updateSystemUserName(this.userNameModel,successCallback,failureCallback);
                }
            },
            applyPassword: function(){
                  var alertContainer = this.alertContainer;
                  var pwdValid = this.passwordModel.isValid();
                  var successCallback = function() {
                  var alertOptionsSuccess = {
                      message: "Password updated Succesfully",
                      type: 'success'
                  };
                  alertContainer.showAlert(alertOptionsSuccess);
                   }
                      
                  var failureCallback = function() {
                  var alertOptionsFailure = {
                      message: "Failed to save Password",
                      type: 'error'
                  }
                  alertContainer.showAlert(alertOptionsFailure);
                  }
                  if (!pwdValid) {
                    var alertPassword = {
                            message: this.passwordModel.validationError,
                            type: 'error'
                        };
                      alertContainer.showAlert( alertPassword );
                  }
                  else {
                      this.systemController.updateSystempassword( this.passwordModel,successCallback,failureCallback);
                }
            },
                  
            render: function () {
                SystemUsernamePasswordView.renderToView(this);
                return this;
            }
        });
    }
);
