define(['./lddModel'], function (LDDModel) {
    "use strict";

    var model = {
        url: function() {
            return LDDModel.serverUrl + 'solutions/' + this.solutionName + '/securitysetupfiles/' + this.fileName;
        }
    };

    var SolutionSecuritySetupModel = LDDModel.extend(model);
    
    return SolutionSecuritySetupModel;
})