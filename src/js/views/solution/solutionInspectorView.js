define(['jquery', 'core', 'controls', 'underscore', 'template!../../../content/solutions/solutionsInspectorView', '../common/tabbedInspectorView', '../solutionSecuritySetupView', '../solutionConfigurationView','../solutionsSummaryView', '../solutionsSummaryNextView','../../eventAggregator'],
    function ($, Core, Controls, _, SolutionsInspectorViewTemplate, TabbedInspectorView, SolutionSecuritySetupView, SolutionConfigurationView, SolutionsSummaryView, SolutionsSummaryNextView, EventAggregator) {

        "use strict";

        return TabbedInspectorView.extend({

            initialize: function (options) {


                this.securityView = options.securityView || new SolutionSecuritySetupView();
                this.configurationView = options.configurationView || new SolutionConfigurationView();
                this.summaryView = options.summaryView || new SolutionsSummaryView();
                this.summaryNextView = options.summaryNextView || new SolutionsSummaryNextView();

                options.childViews = [];
                options.childViews.push({view: this.configurationView, eventTrigger: "solution:configuration"});
                options.childViews.push({view: this.securityView, eventTrigger: "solution:security"});
                options.childViews.push({view: this.summaryView, eventTrigger: "solution:summary"});
                options.childViews.push({view: this.summaryNextView, eventTrigger: "solution:summaryNext"});

                this.initializeTabbedInspectorView(options);
                this.listenTo(this.summaryView, 'onSummaryNextClicked', this.renderSolutionSummaryNext);
                this.listenTo(this.summaryNextView, 'onBack', this.renderSolutionSummary);
                this.listenTo(EventAggregator, "actionsMenu:enable", this.handleActionMenuToggle.bind(this));
            },

            handleActionMenuToggle: function(enabled) {
                if(!enabled)
                    this.triggerInspectorClose();
            },

            renderSolutionSummaryNext: function () {
                console.log('renderSolutionSummaryNext');
                this.handleViewSelected("solution:summaryNext");
            },

            renderSolutionSummary: function () {
                console.log('renderSolutionSummaryNext');
                this.handleViewSelected("solution:summary");
            },

            render: function () {
                TabbedInspectorView.prototype.render.bind(this)(this.currentSolution);
                return this;
            },

            setSolution: function(solutionModel) {
                this.currentSolution = solutionModel;
                this.configurationView.createControls(this.currentSolution);
                this.securityView.createControls(this.currentSolution);
                this.render();
            }
        });
    }
);
