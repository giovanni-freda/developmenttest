define(['./lddModel'], function (LDDModel) {
    "use strict";

    var model = {
        reTypeduserName : undefined,
        url: function() {
            return LDDModel.serverUrl + 'system/username';
        },
        validate:function(attrs) {
            if(attrs.username==''|| this.reTypeduserName=='') {
                return "Enter UserName";
            }
            if(!isNaN(attrs.username)) {
                return "Enter Valid UserName";
            }
            if(attrs.username!=this.reTypeduserName) {
                return "Username are not same";
            }
        }
    };

    var usernameModel = LDDModel.extend(model);

    return usernameModel;
});

