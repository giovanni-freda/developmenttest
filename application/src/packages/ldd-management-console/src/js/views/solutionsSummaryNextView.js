define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/solutionsSummaryNextView', '../solutionsController', './../models/solutionSummaryModel', './lddAlertContainer'],
    function ($, Core, Controls, _, SolutionsSummaryNextViewTemplate, SolutionsController, SolutionSummaryModel, LddAlertContainer) {
        'use strict';


        return Core.View.extend({
            className: "summaryNextView",

            domEvents: {
                'click #summaryBackButton': 'onBack'
            },

            onBack: function () {
                console.log('summary back trigger');
                this.trigger('onBack');
            },

            initialize: function (options) {
                this.session = options.session || Core.App.session;
            },
            render: function (solutionnsummarymodel) {
                var alertContainer = new LddAlertContainer();
                alertContainer.showAlert({message: "Solution Details Clicked"});

                SolutionsSummaryNextViewTemplate.renderToView(this);
                var solutionSummaryData1 = solutionnsummarymodel.attributes;
                var solDeviceGroups = solutionSummaryData1.devicegroups;
                var $deviceGroupsListDiv = this.$('#devicegroupslist');
                this.deviceList = new Controls.List($deviceGroupsListDiv, solDeviceGroups);
                var solClientGroups = solutionSummaryData1.clientgroups;
                var $solClientGroupsListDiv = this.$('#clientgroupslist');
                this.clientGroupsListControl = new Controls.List($solClientGroupsListDiv, solClientGroups);
                var solcsfApps = solutionSummaryData1.esfapps;
                var $solcsfAppsListDiv = this.$('#csfApplicationslist');
                this.csfAppsListControl = new Controls.List($solcsfAppsListDiv, solcsfApps);
                return this;
            }


        });
    });
