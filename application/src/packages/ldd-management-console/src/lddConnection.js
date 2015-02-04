"use strict";
define(['core', 'jquery'], function (Core, $) {

    var token = '';
    var userName = '';

    var LddConnection = function () {
    };

    LddConnection.isLoggedIn = function () {

        // try to get the token from our cookie if we don't already have it
        if (this.token === '' || typeof this.token === 'undefined') {
            this.loadSessionDataFromCookie();
        }

        // if we have a token, then attempt to validate it
        if (this.token !== '' && typeof this.token !== 'undefined') {
            $.ajax(this.getValidateAjax());
        }

        return ((this.token !== '') && (typeof this.token !== 'undefined'));
    };

    LddConnection.logIn = function (username, password) {
        $.ajax(this.getLogInAjax(username, password));
    };

    LddConnection.logOut = function () {
        this.clearSessionData();
        this.trigger('logout');
    };

    LddConnection.onLoginSuccess = function(username, data) {
        this.populateSessionData(username, data.access_token);
        this.trigger('login');
    };

    LddConnection.onLoginError = function(xhr, textStatus, errorThrown) {
        console.log('textStatus = ' + textStatus + '\nerrorThrown = ' + errorThrown);
        this.clearSessionData();
        this.trigger('loginFailure', 'The username:password combination was not correct.');
    };

    LddConnection.onTokenValidateSuccess = function(data) {
        // Ldd returns false, but a limitation in restify will only allow
        // "false" (truthy values required for single object response)
        if (data == false || data == 'false') {
            this.clearSessionData();
        }
    };

    LddConnection.onTokenValidateError = function(xhr, textStatus, errorThrown) {
        /** PULL-REQUEST : Current behavior assumes server or network error, so takes no action. The end
         *                 result is that the current version of Core will call this method about six more times
         *                 to make sure there was really an error. If we do not want that then we should uncomment
         *                 the line below and remove the remaining code, otherwise it should be removed from the method
         */
        // this.clearSessionData();
        this.token = '';
        this.userName = '';
    };

    LddConnection.getUsername = function () {
        return this.userName;
    };

    LddConnection.encodeCredentials = function (username, password) {
        return window.btoa(username + ':' + password);
    };

    LddConnection.clearSessionData = function() {
        this.token = '';
        this.userName = '';
        Core.Cookies.remove('bob');
        Core.Cookies.remove('lddId');
        // PULL-REQUEST : Determine if we want to always clear the last user name from the login page
        // Core.Cookies.remove('lastUsername');
    };

    LddConnection.populateSessionData = function(user, token) {
        this.token = token;
        this.userName = user;
        Core.Cookies.add('bob', this.token);
        Core.Cookies.add('lddId', window.btoa(this.userName));
    };

    LddConnection.loadSessionDataFromCookie = function (){
        this.token = Core.Cookies.get('bob') == null ? '' : Core.Cookies.get('bob') ;
        this.userName = Core.Cookies.get('lddId') == null ? '' : window.atob(Core.Cookies.get('lddId'));
    };

    LddConnection.beforeSendAddAuthHeader = function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
    };

    LddConnection.getLogInAjax = function (username, password){
        var that = this;
        return {
            url: this.serverUrl + 'restauth/v1/token',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Basic " + that.encodeCredentials(username, password)
            },
            success: function(data, textStatus, xhr) {
                that.onLoginSuccess.bind(that)(username, data);
            },
            error: that.onLoginError.bind(that)
        };
    };

    LddConnection.getValidateAjax = function() {
        var that = this;
        return {
            url: this.serverUrl + 'restauth/v1/token/validate?access-token=' + this.token,
            headers: {
                "Content-type": "application/json"
            },
            async: false,
            success: function(data, textStatus, xhr) {
                that.onTokenValidateSuccess.bind(that)(data);
            },
            error : that.onTokenValidateError.bind(that)
        }
    };

    Core.Events.enableFor(LddConnection);

    if (Core.App.config.LddContent && Core.App.config.LddContent.serverUrl) {
        LddConnection.serverUrl = Core.App.config.LddContent.serverUrl;
    } else {
        LddConnection.serverUrl = Core.App.config.serverUrl;
    }

    return LddConnection;
});