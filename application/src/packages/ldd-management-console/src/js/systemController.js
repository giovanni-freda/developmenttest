define(['underscore', 'core',  'logger', './models/licenseModel',  './models/licenseCollection','./models/usernameModel','./models/passwordModel', './models/ldapModel'], 
	function (_, Core, Logger, LicenseModel, LicenseCollection,UserNameModel,PasswordModel, LdapModel) {

	    'use strict';

	    var SystemController = function(options){
	    	_.bindAll(this);
	    	this.licenseModel = options.licenseModel || new LicenseModel();
	    	this.licenseCollection = options.licenseCollection || new LicenseCollection({});
	    	this.ldapModel = options.ldapModel || new LdapModel();
	    };

	    _.extend(SystemController.prototype,{

	    	getLicenseGridColumns: function () {
            	var columns = [
                    {name: "Feature Id", propertyName: 'featureid'},
                    {name: "Expiration Date", propertyName: 'expirationdate'},
                    {name: "Number of Licenses", propertyName: 'numberoflicense'},
                    {name: "Licenses in Use", propertyName: 'checkoutcount'},
                    {name: "Licenses Type", propertyName: 'type'}
                ];
            	return columns;
        	},

            convertToGridRowDefinition : function(){
              var dataRow = [];
              for (var i = 0; i< this.licenseCollection.length; i++) {
                dataRow.push(this.licenseCollection.models[i].attributes);                  
              };
              return dataRow;
            },

            getLicenseInfo:function(options, successCallback, errorCallback){	    		
			  this.licenseCollection.fetch({
			    success:successCallback,
				error:errorCallback
			  });
			},

            getLdapInfo:function(options, successCallback, errorCallback){	    		
	    	  this.ldapModel.fetch({
			    success:successCallback,
			    error:errorCallback
			  });
			  return this.ldapModel;
	    	},


            updateSystemUserName :function(usernameModel,successCallback, failureCallback){                
                usernameModel.isNew = function(){return false;};
                usernameModel.save(usernameModel.attributes,{
                	error: failureCallback,
                	success: successCallback
                });
            },


			updateSystempassword :function( passwordModel,successCallback, failureCallback){
        		passwordModel.isNew = function(){return false;};
        		passwordModel.save(passwordModel.attributes,{
        			error: failureCallback,
        			success: successCallback
        		});
        	},

            saveLdapSettings: function(changedData, successCallback, errorCallback){							
			  this.ldapModel.save(changedData,{
			    error: errorCallback,
			    success: successCallback
			  });
			}
	    });


	Core.Events.enableFor(SystemController.prototype);
    return SystemController;
});