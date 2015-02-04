define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/solutionsSummaryView', '../solutionsController'],
    function ($, Core, Controls, _, SolutionsSummaryViewTemplate, SolutionsController, SolutionSummaryModel) {
        'use strict';

        return Core.View.extend({
            className: "summaryView",
            domEvents: {
                'click #solnsummarynextbtn': 'onSummaryNext'
            },
            initialize: function (options) {
                this.session = options.session || Core.App.session;
            },
            onSummaryNext: function () {
                console.log('summary next trigger');
                this.trigger('onSummaryNextClicked');
            },
            render: function (solutionSummaryModel) {
                var solutionSummaryData = solutionSummaryModel.attributes;
                SolutionsSummaryViewTemplate.renderToView(this, solutionSummaryData);

                var colData = [
                    {name: 'Author', propertyName: "author", width: 100},
                    {name: 'Descriptions', propertyName: "description", width: 300},
                    {name: 'ExpirationDate', propertyName: "expirationdate", width: 200},
                    {name: 'LastModified', propertyName: "lastmodified", width: 100}
                ];
                var eformsData = solutionSummaryData.eforms;
                var $gridDiv = this.$('.grid').css('display', '');


                this.grid = new Controls.Grid($gridDiv, colData, eformsData);

                var solSecurityFilesData = solutionSummaryData.securitysetupfiles;
                var $securityListDiv = this.$('.securityList').css('display', '');
                var listControl = new Controls.List($securityListDiv, solSecurityFilesData);

                return this;
            }
        });
    });
