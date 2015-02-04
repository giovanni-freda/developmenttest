define(['../../../src/js/models/ldapModel'], function (LdapModel) {
    "use strict";
    
    describe('Ldap Model', function () {
        var ldapModel;
        describe('when it fetches', function () {
            beforeEach(function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];
                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };
                ldapModel = new LdapModel();
                ldapModel.fetch({error: function () {
                    console.log("error");
                }});
            });
            afterEach(function () {
                this.xhr.restore();                
                ldapModel = undefined;
            });

            it('should make request on fetch', function () {
                var request = this.requests[0];
                expect(this.requests.length).not.toBe(0);
                expect(request.requestHeaders['LDD-REST-Version']).toBeTruthy();
            });           
        });
    });
});