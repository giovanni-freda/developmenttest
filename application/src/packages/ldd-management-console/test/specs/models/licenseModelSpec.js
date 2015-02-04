define(['../../../src/js/models/licenseModel', 'jquery'], function (LicenseModel, $) {
    "use strict";
    
    describe('License Model', function () {
        var licenseModel;


        describe('when it fetches', function () {


            beforeEach(function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };


                licenseModel = new LicenseModel();
                licenseModel.fetch({error: function () {
                    console.log("error");
                }});
            });

            afterEach(function () {
                this.xhr.restore();                
                licenseModel = undefined;
            });

            it('should make request on fetch', function () {
                var request = this.requests[0];
                expect(this.requests.length).not.toBe(0);
                expect(request.requestHeaders['LDD-REST-Version']).toBeTruthy();
            });           
        });

    });
});