define(['../../../src/js/models/solutionModel', 'jquery'], function (SolutionModel, $) {
    "use strict";
    var MOCK_GET_DATA = {
        name: 'Solution Model',
    };

    var MOCK_POST_DATA = {
        success: true
    };


    describe('Solution Model', function () {
        var solutionModel;


        describe('when it fetches', function () {


            beforeEach(function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };


                solutionModel = new SolutionModel();
                solutionModel.fetch({error: function () {
                    console.log("error");
                }});
            });

            afterEach(function () {
                this.xhr.restore();
                solutionModel = undefined;
            });

            it('should make request on fetch', function () {
                var request = this.requests[0];
                expect(this.requests.length).not.toBe(0);
            });
        });

    });
});