define(['./lddModel'], function (LDDModel) {
    "use strict";

    var model = {

        url: function() {
            return LDDModel.serverUrl + 'solutions/' + this.solutionName + '/config';
        }
    };

    var SolutionConfigSettingModel = LDDModel.extend(model);
    
    return SolutionConfigSettingModel;
})