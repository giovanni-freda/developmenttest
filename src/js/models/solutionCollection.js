define(['./lddCollection', './solutionModel'], function (LDDCollection, SolutionModel) {
    "use strict";

    var collection = {
        url: LDDCollection.serverUrl + 'solutions',
        model: SolutionModel
    };

    var solutionsCollection = LDDCollection.extend(collection);

    return solutionsCollection;
});

