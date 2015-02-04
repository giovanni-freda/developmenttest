define(['core', './js/lmcModule', './lddConnection'], function (Core, LmcModule, LddConnection) {
    'use strict';

    var exports = {
        LmcModule: LmcModule, //All modules must be exported. Add to config.json via example:Module
        LddConnection: LddConnection
    };

    return exports;
});
