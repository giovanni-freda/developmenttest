define(['../../../src/js/models/lddCollection', 'jquery'], function (LddCollection, $) {
    "use strict";
    var MOCK_GET_DATA = {
        name: 'Ldd Collection',
    };

    var MOCK_POST_DATA = {
        success: true
    };


    describe('LDD Collection', function () {
        var lddCollection;


        describe('when it fetches', function () {


            beforeEach(function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };


                lddCollection = new LddCollection();
                lddCollection.url = "/";
                lddCollection.fetch({error: function () {
                    console.log("error");
                }});
            });

            afterEach(function () {
                this.xhr.restore();
                //ajaxSpy.restore();
                lddCollection = undefined;
            });

            it('should set ldd rest version header', function () {
                var request = this.requests[0];
                expect(this.requests.length).not.toBe(0);
                expect(request.requestHeaders['LDD-REST-Version']).toBeTruthy();

            });
        });

    });
});