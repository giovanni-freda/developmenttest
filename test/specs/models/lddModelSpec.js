define(['../../../src/js/models/lddModel', 'jquery'], function (LddModel, $) {
    "use strict";
    var MOCK_GET_DATA = {
        name: 'Ldd Model',
    };

    var MOCK_POST_DATA = {
        success: true
    };


    describe('LDD Model', function () {
        var lddModel;


        describe('when it fetches', function () {


            beforeEach(function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };


                lddModel = new LddModel();
                lddModel.url = "/";
                lddModel.fetch({error: function () {
                    console.log("error");
                }});
            });

            afterEach(function () {
                this.xhr.restore();
                lddModel = undefined;
            });

            it('should set ldd rest version header', function () {
                var request = this.requests[0];
                expect(this.requests.length).not.toBe(0);
                expect(request.requestHeaders['LDD-REST-Version']).toBeTruthy();

            });
        });

    });
});