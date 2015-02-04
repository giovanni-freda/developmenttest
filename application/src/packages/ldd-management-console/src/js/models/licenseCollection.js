define(['./lddCollection', './licenseModel'], function (LDDCollection, LicenseModel) {
    "use strict";

    var collection = {
        url : LDDCollection.serverUrl + 'system/license',
        model: LicenseModel
    };

    var licenseCollection = LDDCollection.extend(collection)

    return licenseCollection;
});