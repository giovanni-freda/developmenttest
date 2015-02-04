define(['../../../src/js/models/passwordModel', 'jquery'], function (PasswordModel, $) {
    "use strict";
    
    describe('Password Model', function () {
        var passwordModel;


        describe('when it saves', function () {
            var errors;
            beforeEach(function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                passwordModel = new PasswordModel();
            });

            afterEach(function () {
                this.xhr.restore();                
                passwordModel = undefined;
            });

            it('should make request on save', function () {
                passwordModel.attributes.currentpassword="Old";
                passwordModel.attributes.newpassword="New";
                passwordModel.newretypedpassword="New";
                passwordModel.save(passwordModel.attributes,{error: function () {
                    console.log("error");
                },succcess:function () {
                    console.log("success");
                }});
                var request = this.requests[0];
                expect(this.requests.length).not.toBe(0);
            });
            it('should validate input for current and new password should not be same', function () {
                var mockpassword = {currentpassword:'Old',newpassword:'Old'};
                passwordModel.newretypedpassword='Old';
                errors = passwordModel.validate(mockpassword);
                expect(errors.length).not.toEqual(0);
            });
            it('should validate input for blank password', function () {
                var mockpassword = {currentpassword:'',newpassword:'New'};
                passwordModel.newretypedpassword='New';
                errors = passwordModel.validate(mockpassword);
                expect(errors.length).not.toEqual(0);
            }); 
            it('should validate input for new blank password', function () {
                var mockpassword = {currentpassword:'Old',newpassword:''};
                passwordModel.newretypedpassword='';
                errors = passwordModel.validate(mockpassword);
                expect(errors.length).not.toEqual(0);
            });              
        });

    });
});