define(['./lddModel'], function (LDDModel) {
    "use strict";

    var ldapModel = LDDModel.extend({      	

       url: function() {
            return LDDModel.serverUrl + 'system/ldapsettings';
        }
    });

    return ldapModel;
});

