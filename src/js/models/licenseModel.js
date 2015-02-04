define(['./lddModel'], function (LDDModel) {
    "use strict";

    var model = {
        id : undefined,
        featureid:undefined,
        expirationdate:undefined,
        numberoflicense:undefined,
        sign:undefined,
        checkoutcount:undefined,
        type:undefined,
        loadbalancerip:undefined,

        url: LDDModel.serverUrl + 'system/license'
    };

    var licenseModel = LDDModel.extend(model);

    return licenseModel;
});

