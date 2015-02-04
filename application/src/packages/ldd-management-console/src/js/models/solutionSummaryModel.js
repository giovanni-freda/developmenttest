define(['./lddModel'], function (LDDModel) {
    "use strict";

    var model = {
        name: undefined,
        version: undefined,
        installtime: undefined,
        updatetime: undefined,
        devicegroups: undefined,
        clientgroups: undefined,
        eforms: undefined,
        reports: undefined,
        esfapps: undefined,
        configs: undefined,
        securitysetupfiles: undefined,

        url: function () {
            return LDDModel.serverUrl + 'solutions/' + this.name;
        },
        initialize: function () {
        },
        fetch: function (options) {
            options = options || {};
            options.type = 'GET';
            options.data = JSON.stringify({
                "name": ""
            });
            LDDModel.prototype.fetch.call(this, options);
        }

    };

    var SolutionsSummaryModel = LDDModel.extend(model);

    return SolutionsSummaryModel;
});

