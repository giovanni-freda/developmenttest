define(['core', '../../lddConnection'], function (Core, LddConnection) {
    "use strict";

    var collection = {

        fetch: function (options) {
            var originalBeforeSend = options.beforeSend;

            options.beforeSend = function (xhr) {

                if (originalBeforeSend) originalBeforeSend(xhr);
                xhr.setRequestHeader('LDD-REST-Version', '1.0.0');
            };
            return Core.Collection.prototype.fetch.call(this, options);
        },

        sync: function (method, model, options) {
            var originalBeforeSend = options.beforeSend;

            options.beforeSend = function (xhr) {
                if (originalBeforeSend) originalBeforeSend(xhr);
                LddConnection.beforeSendAddAuthHeader(xhr);
            };
            return Core.Collection.prototype.sync.call(this, method, model, options);
        }
    };

    var lddCollection = Core.Collection.extend(collection);
    lddCollection.serverUrl = LddConnection.serverUrl;

    return lddCollection;
});