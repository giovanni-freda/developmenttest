define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/licenseView', '../models/licenseCollection', '../systemController'],
    function ($, Core, Controls, _, LicenseView, LicenseCollection, SystemController) {

        "use strict";
               
        return Core.View.extend({
            initialize: function (options) {
               console.log('license view initialize');
               this.systemController = options.systemController || new SystemController({});
               this.createGrid = options.createGrid || this.defaultGridCreation.bind(this);
               this.columns = options.columns || this.systemController.getLicenseGridColumns();
               
               var errorCallback= function(){
               };
               var successCallback = function(){
               };
               this.systemController.getLicenseInfo({}, successCallback, errorCallback);               
            },

            defaultGridCreation: function (element, columns, rows, options) {
                return new Controls.Grid(element, columns, rows, options);
            },
            
            render: function () {
                var data = this.systemController.convertToGridRowDefinition();
                LicenseView.renderToView(this);

                var licenseViewElement = this.$("#licenseView");
                this.createGrid(licenseViewElement, this.columns, data);            
               
                return this;
            }
        });
    }
);
