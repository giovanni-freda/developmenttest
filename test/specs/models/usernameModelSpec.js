define(['../../../src/js/models/usernameModel', 'jquery'], function (UsernameModel, $) {
    "use strict";
    
    describe('Username Model', function () {
        var usernameModel;


        describe('when it saves', function () {
            var errors;
            beforeEach(function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                usernameModel = new UsernameModel();
            });

            afterEach(function () {
                this.xhr.restore();                
                usernameModel = undefined;
            });

            it('should make request on save', function () {
                var username = {};
                usernameModel.save(username,{error: function () {
                    console.log("error");
                },succcess:function () {
                    console.log("success");
                }});
                var request = this.requests[0];
                expect(this.requests.length).not.toBe(0);
            });
            it('should validate input for blank userName', function () {
                var mockusername = {username:'',reTypeduserName:''};
                errors = usernameModel.validate(mockusername);
                expect(errors.length).not.toEqual(0);
            }); 
            it('should validate input for username as not a number', function () {
                var mockusernameNumber = {username:'123'};
                errors = usernameModel.validate(mockusernameNumber);
                expect(errors.length).not.toEqual(0);
            });              
        });

    });
});