define(['core', '../../lddConnection'], function (Core, LddConnection) {
    "use strict";

    var model = {

        fetch: function (options) {
            var originalBeforeSend = options.beforeSend;

            options.beforeSend = function (xhr) {
                if (originalBeforeSend) originalBeforeSend(xhr);
                xhr.setRequestHeader('LDD-REST-Version', '1.0.0');
            };
            return Core.Model.prototype.fetch.call(this, options);
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

    var lddModel = Core.Model.extend(model);

    if (Core.App.config.LddContent && Core.App.config.LddContent.serverUrl) {
        lddModel.serverUrl = Core.App.config.LddContent.serverUrl;
    } else {
        lddModel.serverUrl = Core.App.config.serverUrl;
    }


    return lddModel;
});

