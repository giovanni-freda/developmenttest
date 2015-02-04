define(['./lddModel'], function (LDDModel) {
    "use strict";

    var model = {
        url: function() {
            return LDDModel.serverUrl + 'solutions/' + this.attributes.name;
        }
    };

    var SolutionsModel = LDDModel.extend(model);

    return SolutionsModel;
});

