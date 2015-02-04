define(['../../src/lddConnection', 'core'], function (LddConnection, Core) {
    'use strict';

    describe('LddConnection', function () {

        describe('when loading session data from a cookie', function () {
            var cut;
            var tokenCookie = 'testToken';
            var userId = 'testUserId';
            var userCookie = window.btoa(userId);

            beforeEach(function () {
                cut = LddConnection;
            });

            afterEach(function () {
                Core.Cookies.remove('bob');
                Core.Cookies.remove('lddId');
            });

            it('should return \'\' if they are not present', function () {
                cut.loadSessionDataFromCookie();
                expect(cut.token).toBe('');
                expect(cut.userName).toBe('');
            });

            it('should return the correct values if they are present', function () {
                Core.Cookies.add('bob', tokenCookie);
                Core.Cookies.add('lddId', userCookie);
                cut.loadSessionDataFromCookie();
                expect(cut.token).toBe(tokenCookie);
                expect(cut.userName).toBe(userId);
            });
        });

        describe('when populating session data', function () {
            var cut;
            var tokenCookie = 'testToken';
            var userId = 'testUserId';

            beforeEach(function () {
                cut = LddConnection;
                Core.Cookies.remove('bob');
                Core.Cookies.remove('lddId');
            });

            afterEach(function () {
                Core.Cookies.remove('bob');
                Core.Cookies.remove('lddId');
            });

            it('should create cookies with the correct values', function () {
                cut.populateSessionData(userId, tokenCookie);
                expect(Core.Cookies.get('bob')).toBe(tokenCookie);
                expect(Core.Cookies.get('lddId')).toBe(window.btoa(userId));
            });
        });

        describe('when clearing session data', function () {
            var cut;

            beforeEach(function () {
                cut = LddConnection;
                cut.token = 'test token string';
                cut.userName = 'test user id string';
                Core.Cookies.add('bob', 'test token string');
                Core.Cookies.add('lddId', 'test user id string');
            });

            afterEach(function () {
                Core.Cookies.remove('bob');
                Core.Cookies.remove('lddId');
            });

            it('should clear correct properties and cookies', function () {
                cut.clearSessionData();
                expect(cut.token).toBe('');
                expect(cut.userName).toBe('');
                expect(Core.Cookies.get('bob')).toBe(null);
                expect(Core.Cookies.get('lddId')).toBe(null);
            });
        });

        describe('when returning the user name', function () {
            var cut;
            var testUserName = 'test user id string';

            beforeEach(function () {
                cut = LddConnection;
                cut.userName = testUserName;
            });

            it('returns it properly', function () {
                expect(cut.getUsername()).toBe(testUserName);
            });
        });

        describe('when beforeSendAddAuthHeader is called', function () {
            var cut;
            var tokenValue = 'this_is_a_test_token';
            var expectedHeader = 'Bearer ' + tokenValue;

            beforeEach(function () {
                cut = LddConnection;
                cut.token = tokenValue;
                this.xhr = {};
                this.xhr.setRequestHeader = sinon.spy();
            });

            afterEach(function() {
                this.xhr = undefined;
            });

            it('a bearer Authorization header is added to the request', function () {
                cut.beforeSendAddAuthHeader(this.xhr);
                expect(this.xhr.setRequestHeader.getCall(0).args[0]).toBe('Authorization');
                expect(this.xhr.setRequestHeader.getCall(0).args[1]).toBe(expectedHeader);
            });
        });

        describe('when encoding credentials', function () {
            var cut;
            var user = 'userId';
            var pwd = 'password';

            beforeEach(function () {
                cut = LddConnection;
            });

            it('encodes them properly', function () {
                expect(cut.encodeCredentials(user, pwd)).toBe(window.btoa(user + ':' + pwd));
            });
        });

        describe('when there is a token validation request error', function () {
            var cut;
            var tokenCookie = 'test token cookie';
            var userIdCookie = 'test user id cookie';

            beforeEach(function () {
                cut = LddConnection;
                cut.token = 'test token string';
                cut.userName = 'test user string';
                Core.Cookies.add('bob', tokenCookie);
                Core.Cookies.add('lddId', userIdCookie);
            });

            afterEach(function () {
                Core.Cookies.remove('bob');
                Core.Cookies.remove('lddId');
            });

            it('should clear username and token', function () {
                cut.onTokenValidateError({}, {}, {});
                expect(cut.token).toBe('');
                expect(cut.userName).toBe('');
            });

            it('should not clear session cookies', function () {
                cut.onTokenValidateError({}, {}, {});
                expect(Core.Cookies.get('bob')).toBe(tokenCookie);
                expect(Core.Cookies.get('lddId')).toBe(userIdCookie);
            });

        });

        describe('when a token validation request is successful', function () {
            var cut;
            var sessionCleared = false;

            beforeEach(function () {
                cut = LddConnection;
                cut.clearSessionData = function () {
                    sessionCleared = true;
                };
            });

            afterEach(function () {
            });

            it('should clear session data if ldd responds with false', function () {
                cut.onTokenValidateSuccess(false);
                expect(sessionCleared).toBe(true);
            });

            it('should clear session data if restify responds with \'false\'', function () {
                cut.onTokenValidateSuccess('false');
                expect(sessionCleared).toBe(true);
            });

            it('should not clear session data for a positive response', function () {
                cut.onTokenValidateSuccess(true);
                expect(sessionCleared).toBe(true);
            });
        });

        describe('when there is a login request error', function () {
            var cut;
            var sessionCleared = false;
            var triggeredLoginFailure = false;
            var triggerMessage;

            beforeEach(function () {
                cut = LddConnection;
                cut.clearSessionData = function () {
                    sessionCleared = true;
                };
                cut.trigger = function (event) {
                    if (event == 'loginFailure') {triggeredLoginFailure = true}
                    triggerMessage = arguments[1];
                };
            });

            it('should clear the session data', function () {
                cut.onLoginError({}, {}, {});
                expect(sessionCleared).toBe(true);
            });

            it('should trigger \'loginFailure\'', function () {
                cut.onLoginError({},{},{});
                expect(triggeredLoginFailure).toBe(true);
            });

            it('should return additional string message parameters', function () {
                cut.onLoginError({},{},{});
                expect(triggerMessage).toBeDefined();
            });
        });

        describe('when there is a successful login request', function () {
            var cut;
            var sessionCleared = false;
            var triggeredLogin = false;
            var validUserName = 'represents a good user name';
            var validToken = 'represents a good token';
            var validData = { access_token : validToken };
            var verifiedToken;
            var verifiedUserName;

            beforeEach(function () {
                cut = LddConnection;
                cut.populateSessionData = function (username, token) {
                    sessionCleared = true;
                    verifiedUserName = username;
                    verifiedToken = token;
                };
                cut.trigger = function (event) {
                    if (event == 'login') {triggeredLogin = true}
                };
            });

            it('should populate the session data correctly', function () {
                cut.onLoginSuccess(validUserName, validData);
                expect(sessionCleared).toBe(true);
                expect(verifiedUserName).toBe(validUserName);
                expect(verifiedToken).toBe(validData.access_token);
            });

            it('should trigger \'login\'', function () {
                cut.onLoginSuccess(validUserName, validData);
                expect(triggeredLogin).toBe(true);
            });

        });

        describe('when logOut is called', function () {
            var cut;
            var sessionCleared = false;
            var triggeredLogout = false;

            beforeEach(function () {
                cut = LddConnection;
                cut.clearSessionData = function () {
                    sessionCleared = true;
                };
                cut.trigger = function (event) {
                    if (event == 'logout') {triggeredLogout = true}
                };
            });

            it('should clear session data', function () {
                cut.logOut();
                expect(sessionCleared).toBe(true);
            });

            it('should trigger \'logout\'', function () {
                cut.logOut();
                expect(triggeredLogout).toBe(true);
            });

        });

        describe('when logIn is called', function () {
            var cut;
            var userCalledWith;
            var dataReturned;
            var dataCalledWith;
            var tokenCalledWith;
            var server;
            var successSpy;
            var errorSpy;

            beforeEach(function () {
                server = sinon.fakeServer.create();

                cut = LddConnection;
                tokenCalledWith = 'Represents a valid token';
                dataReturned = {access_token : tokenCalledWith};

                successSpy = sinon.stub(cut, "onLoginSuccess", function(user, data) {
                    userCalledWith = user;
                    dataCalledWith = data;
                });

                errorSpy = sinon.stub(cut, "onLoginError");
            });

            afterEach(function () {
                server.restore();
                successSpy.restore();
                errorSpy.restore();
            });

            it('should call onLoginSuccess with the right information when successful', function () {
                cut.logIn("fred", "jones");
                server.requests[0].respond (
                    200,
                    {'Content-Type' : 'application/json'},
                    JSON.stringify( dataReturned )
                );
                expect(userCalledWith).toBe('fred');
                expect(dataCalledWith.access_token).toBe(tokenCalledWith);
                expect(cut.onLoginSuccess.calledOnce).toBeTruthy();
            });

            it('should call onLoginError when there is a failure', function () {
                cut.logIn("admin", "admin");
                server.requests[0].respond (
                    401,
                    {'Content-Type' : 'application/json'},
                    JSON.stringify( {} )
                );
                expect(cut.onLoginError.calledOnce).toBeTruthy();
            });
        });

        describe('when isLoggedIn is called', function () {
            var cut;
            var dataReturned;
            var server;
            var loadSessionSpy;
            var successSpy;
            var errorSpy;
            var validateAjax;

            beforeEach(function () {
                server = sinon.fakeServer.create();

                cut = LddConnection;
                // Force an asynchronous call at test time due to a sinon limitation
                validateAjax = cut.getValidateAjax.bind(cut);
                cut.getValidateAjax = function () {
                    var temp = validateAjax();
                    temp.async = true;
                    return temp;
                };

                loadSessionSpy = sinon.stub(cut, 'loadSessionDataFromCookie');
                successSpy = sinon.stub(cut, "onTokenValidateSuccess", function(data) {
                    dataReturned = data;
                });
                errorSpy = sinon.stub(cut, "onTokenValidateError");
            });

            afterEach(function () {
                server.restore();
                loadSessionSpy.restore();
                successSpy.restore();
                errorSpy.restore();
                cut.token = '';
                cut.getValidateAjax = validateAjax;
            });

            it('should not try to load session data from a cookie if it already has valid data', function () {
                cut.token = 'current_token';
                cut.isLoggedIn();
                expect(cut.loadSessionDataFromCookie.calledOnce).toBeFalsy();
            });

            it('should try to load session data from a cookie if it does not have valid data', function () {
                cut.isLoggedIn();
                expect(cut.loadSessionDataFromCookie.calledOnce).toBeTruthy();
            });

            it('calls onTokenValidateSuccess when a successful request to validate a token is received', function () {
                cut.token = 'current_token';
                cut.isLoggedIn();
                server.requests[0].respond (
                    200,
                    {'Content-Type' : 'application/json'},
                    JSON.stringify( {} )
                );
                expect(cut.onTokenValidateSuccess.calledOnce).toBeTruthy();
            });

            it('calls onTokenValidateError when a request to validate a token is unsuccessful', function () {
                cut.token = 'current_token';
                cut.isLoggedIn();
                server.requests[0].respond (
                    401,
                    {'Content-Type' : 'application/json'},
                    JSON.stringify( {} )
                );
                expect(cut.onTokenValidateError.calledOnce).toBeTruthy();
            });
        });
    });
});
