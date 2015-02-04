define(['./lddModel'], function (LDDModel) {
    "use strict";

    var model = {
        newretypedpassword : undefined,
        url: function() {
            return LDDModel.serverUrl + 'system/password';
        },
        validate:function(attrs) {
            if(attrs.currentpassword == attrs.newpassword) {
                return "Old Password  and new Password should not be same";
            }
            if(this.newretypedpassword != attrs.newpassword) {
                return "Password are not same";
            }
            if(attrs.currentpassword=='') {
                return "Enter Password";
            }
            if(attrs.newpassword=='' && this.newretypedpassword=='') {
                return "Enter New Password";
            }
        }
    };

    var passwordModel = LDDModel.extend(model);

    return passwordModel;
});

