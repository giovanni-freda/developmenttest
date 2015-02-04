define(['underscore', 'core', './models/solutionCollection', './models/solutionSummaryModel',
        './models/solutionSecuritySetupModel', './models/solutionConfigSettingModel', '../lddConnection', 'logger'],
    function (_, Core, SolutionCollection, SolutionSummaryModel,
              SolutionSecuritySetupModel, SolutionConfigSettingModel, LddConnection, Logger) {

    'use strict';

    var SolutionsController = function (options) {
        _.bindAll(this);
        this.solutionCollection = options.solutionCollection || new SolutionCollection();
        this.session = options.session || Core.App.session;
        this.serverUrl = options.serverUrl || LddConnection.serverUrl;
    };

    _.extend(SolutionsController.prototype, {

        getSolutionSummaryModel: function (solutionName, callBack) {
            var that = this;
            var solutionSummaryModel = new SolutionSummaryModel();
            solutionSummaryModel.name = solutionName;
            solutionSummaryModel.fetch({
                success: callBack,
                error: function (model, response, options, error) {
                    that.trigger('error', error);
                }.bind(this)
            });
            return solutionSummaryModel;
        },

        getDrawerModel: function (solution) {
            var baseUrl = this.serverUrl + "solutions/" + solution.id;
            return {
                name: solution.attributes.name,
                tasks: [
                    {name: "Configuration", url: baseUrl + "/configuration" } ,
                    {name: "Security Setup Files", url: baseUrl + "/securitySetup" }
                ]
            };
        },

        getSolutionGridColumns: function () {
            var columns = [
                {name: "Solution Name", propertyName: 'name'},
                {name: "Version", propertyName: 'version'},
                {name: "Install Time", propertyName: 'installtime'},
                {name: "Update Time", propertyName: 'updatetime'}
            ];

            return columns;
        },

        hasSolutions: function () {
            return this.solutionCollection.length != 0;
        },

        loadSolutions: function (options) {
            if (!this.session.isActive()) {
                this.session.on('begin', function () {
                    this.loadSolutions(options);
                }.bind(this));
            }
            else {
                this.solutionCollection.fetch({
                    success: options.success,
                    error: function (model, response, options, error) {
                        this.trigger('error', error);
                    }.bind(this)
                });
            }
        },

        selectSolution: function (solution) {
            var solutionInstance = null;
            if (!this.solutionCollection.length) { //collection not yet loaded
                this.solutionCollection.once('sync', function () {
                    this.selectSolution(solution);
                }.bind(this));
                return;
            }

            if (typeof(solution) === 'string' || typeof(solution) === 'number') {
                solutionInstance = this.solutionCollection.get(solution);
            }
            if (!solutionInstance) return;

            this.selectedSolution = solutionInstance;
            this.trigger("change:selectedSolution", solutionInstance);
            Logger.log('Selecting solution: ' + solutionInstance.id, Logger.VERBOSE);

            Core.Location.navigate(this.serverUrl + 'solutions/' + solutionInstance.id);
            return solutionInstance;
        },

        requestNotificationOnFetch: function (func, object) {
            this.listenTo(this.solutionCollection, 'sync', function () {
                func.bind(object)();
            });
        },

        requestNotificationOnRemove: function (func, object) {
            this.listenTo(this.solutionCollection, 'remove', function () {
                func.bind(object)();
            });
        },

        getSolutionRows: function () {
            var rows = [];
            if (this.hasSolutions()) {
                for (var currentSolutionIndex = 0; currentSolutionIndex < this.solutionCollection.length; currentSolutionIndex++) {
                    var rowModelData = this.solutionCollection.models[currentSolutionIndex].attributes;
                    rows.push(rowModelData);
                }
            }

            return rows;
        },
       
        saveSolutionUCFFile: function(solutionModel, ucfFileDetails, successCallback, failureCallback){
            var securitySetupModel = new SolutionSecuritySetupModel(ucfFileDetails);
            securitySetupModel.solutionName = solutionModel.attributes.name;
            securitySetupModel.fileName = ucfFileDetails.name;
            
            //Override backbone's isNew function so that a PUT is used instead of POST
            securitySetupModel.isNew = function(){return false;};

            var that = this;
            securitySetupModel.save(ucfFileDetails,
                                    {
                                     error: failureCallback,
                                     success: successCallback
                                    }
                                   );
        },

        saveSolutionConfigSettings: function(solutionModel, configSettingUpdates, successCallback){
            var configSettingModel = new SolutionConfigSettingModel(configSettingUpdates);
            configSettingModel.solutionName = solutionModel.attributes.name;
            configSettingModel.settings = configSettingUpdates;

            //Override backbone's isNew function so that a PUT is used instead of POST
            configSettingModel.isNew = function(){return false;};

            var that = this;
            configSettingModel.save(configSettingUpdates,
                {
                    error: function(model, response, options, error){ this.trigger('error', error); }.bind(this),
                    success: successCallback
                }
            );
        },

        deleteSolution: function(solutionModel, options) {
            for(var modelIndex in this.solutionCollection.models) {
                var found = this.solutionCollection.models[modelIndex].attributes.name == solutionModel.name;
                if(found) {
                    var solutionToDelete = this.solutionCollection.models[modelIndex];
                    //Override backbone's isNew function so that the delete is issued
                    solutionToDelete.isNew = function(){return false;};
                    solutionToDelete.destroy({
                            success:   function(model, response, successOptions) {
                                if(options && options.success)
                                    options.success(model);
                            },
                            error: function (model, response, errorOptions) {
                                if(options && options.error)
                                    options.error(model);
                            },
                            wait: true
                        }
                    );
                }
            }
        },

        deleteAllSolutions: function(options) {
            options.bulk = true;
            var solutionToDelete;

            while (solutionToDelete = this.solutionCollection.first()) {
                solutionToDelete.isNew = function(){return false;};
                solutionToDelete.destroy({
                    success:   function(model, response, successOptions) {
                        if(options && options.success)
                            options.success(model);
                    },
                    error: function (model, response, errorOptions) {
                        if(options && options.error)
                            options.error(model);
                    }
                });
            }
        }
    });

    Core.Events.enableFor(SolutionsController.prototype);

    return SolutionsController;
});
