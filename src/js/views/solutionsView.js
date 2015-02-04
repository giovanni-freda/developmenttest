define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/solutionsView', '../solutionsController', './solutionsSummaryView', './solutionsSummaryNextView', './solutionSecuritySetupView', './solutionConfigurationView', '../eventAggregator', './lddAlertContainer', './solution/solutionInspectorView', './solution/solutionToolbarDefinition'],
    function ($, Core, Controls, _, SolutionsViewTemplate, SolutionsController, SolutionsSummaryView, SolutionsSummaryNextView, SolutionSecuritySetupView, SolutionConfigurationView, EventAggregator, LddAlertContainer, SolutionInspectorView, SolutionToolbarDefinition) {
        'use strict';

        var solutionsViewLogic = {

            initialize: function (options) {
                this.session = options.session || Core.App.session;
                this.location = options.location || Core.Location;
                this.solutionsController = options.solutionsController || new SolutionsController({});
                this.solutionsController.loadSolutions({});
                this.toolbarDefinition = this.solutionsToolbarDefinition = options.toolbarDefinition || new SolutionToolbarDefinition();
                this.selectedRows = {};
                this.inspectorView = options.solutionsInspectorView || new SolutionInspectorView();

                this.createGrid = options.createGrid || this.defaultGridCreation.bind(this);

                this.alertContainer = options.alertContainer || new LddAlertContainer();

                this.listenTo(EventAggregator, 'solution:install', function() {
                    this.handleActionSelected("install");
                });
                this.listenTo(EventAggregator, 'solution:remove', function() {
                    this.handleActionSelected("remove");
                });
                this.listenTo(EventAggregator, 'solution:removeAll' , function() {
                    this.handleActionSelected("removeAll");
                });

                this.listenTo(this,"change:currentSelection", this.handleCurrentSelectionChanged.bind(this) );

                this.solutionsController.requestNotificationOnRemove(this.onSolutionRemove.bind(this));
            },

            defaultGridCreation: function (element, columns, rows, options) {
                return new Controls.Grid(element, columns, rows, options);
            },

            getInspectorView: function () {

                return this.inspectorView;
            },

            solutionSelected: function (solutionname, callback) {
                this.currentSolution = this.solutionsController.getSolutionSummaryModel(solutionname, callback);
            },

            handleActionSelected: function (actionSelected) {
                var deleteSolutionCallbacks = {success: this.removeSuccess.bind(this), error: this.removeError.bind(this)};
                var deleteAllSolutionCallbacks = {success: this.removeAllSuccess.bind(this), error: this.removeAllError.bind(this)};
                if(actionSelected == "remove") {
                    var numSelectedSolutions = Object.keys(this.selectedRows).length;

                    $.each(this.selectedRows, function(key, currentSolution) {
                            this.solutionsController.deleteSolution(currentSolution, deleteSolutionCallbacks);
                    }.bind(this));

                }
                if(actionSelected == "removeAll") {
                    this.solutionsController.deleteAllSolutions(deleteAllSolutionCallbacks);
                    this.renderSolutionList();
                }
            },

            triggerRowSelectionChanged: function() {
                this.trigger("change:currentSelection", this.selectedRows);
            },

            removeAllSuccess: function(model) {
                this.selectedRows = {};
                this.alertContainer.showAlert({message: "Success removing " + model.attributes.name});
                this.triggerRowSelectionChanged();
            },

            removeAllError: function(model) {
                this.alertContainer.showAlert({message: "Success removing " + model.attributes.name});
            },

            removeSuccess: function(model) {
                this.selectedRows = {};
                this.alertContainer.showAlert({message: "Success removing " + model.attributes.name});
                this.triggerRowSelectionChanged();
            },

            removeError: function(model) {
                this.alertContainer.showAlert({message: "Error removing " + model.attributes.name});
            },

            onSolutionRemove: function(options) {
                if(options == undefined || options.bulk == undefined || options.bulk == false)
                    this.renderSolutionList();
            },

            renderSolutionList: function () {
                var options = {
                    useCheckboxSelection: true
                }

                var columns = this.solutionsController.getSolutionGridColumns();
                var rows = this.solutionsController.getSolutionRows();

                if(this.solutionsGrid) {
                    this.stopListening(this.solutionsGrid);
                }


                var solutionsGridObject = this.createGrid(this.$('#solutionsArea'), columns, rows, options);
                solutionsGridObject.onLoaded(function () {
                    for (var i = 0; i < columns.length; i++) {
                        solutionsGridObject.resizeColumnToFit(i);
                    }
                });

                this.solutionsGrid = solutionsGridObject;

                this.listenTo(this.solutionsGrid, 'change:selection', this.rowSelectionChanged);
                solutionsGridObject.invalidate();
            },

            handleListSelected: function (listSelected) {
                console.log("solutionsView::handleListSelected::" + listSelected);
                this.currentSolution = null;
                this.selectedRows = {};
            },

            onSolutionFetched: function (model) {
                this.currentSolution = model;
                var url = this.currentSolution.serverUrl + 'solutions';
                url += '/' + this.currentSolution.name;
            },

            getNumSelectedSolutions: function() {
                var numSelectedSolutions = Object.keys(this.selectedRows).length;
                return numSelectedSolutions;
            },

            hasSingleSolutionSelected: function() {
                var numSelectedSolutions = this.getNumSelectedSolutions();
                return numSelectedSolutions == 1;
            },

            handleCurrentSelectionChanged: function() {
                var hasSingleSolutionSelected = this.hasSingleSolutionSelected()
                EventAggregator.trigger("actionsMenu:enable", hasSingleSolutionSelected);

                if(hasSingleSolutionSelected) {
                    this.inspectorView.setSolution(this.solutionsController.solutionCollection.at(Object.keys(this.selectedRows)[0]));
                }
            },

            rowSelectionChanged: function (e, changedRows) {
                //This event can be handled to respond to changes in selection. The changedRows property is an array composed of the rows that have been either been selected or deselected during the last operation.
                for (var currentRow = 0; currentRow < changedRows.length; currentRow++) {
                    if (this.selectedRows[changedRows[currentRow].index] && !changedRows[currentRow].isSelected)
                        delete this.selectedRows[changedRows[currentRow].index];
                    else
                        this.selectedRows[changedRows[currentRow].index] = changedRows[currentRow].sourceItem;
                }

                this.triggerRowSelectionChanged();
            },

            render: function () {
                console.log("solutionsView::render::" + this.current++);
                var that = this;

                SolutionsViewTemplate.renderToView(this);
                this.renderSolutionList();

                return this;
            }
        };

        //this is how to decorate classes
        _.extend(solutionsViewLogic, SolutionToolbarDefinition);

        var solutionsView = Core.View.extend(solutionsViewLogic);

        return solutionsView;
    });
