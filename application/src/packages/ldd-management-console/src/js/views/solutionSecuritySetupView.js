define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/solutionSecuritySetupView', '../solutionsController', './lddAlertContainer'], 
    function ($, Core, Controls, _, SolutionSecuritySetupViewTemplate, SolutionsController, LddAlertContainer ) {
            

            return Core.View.extend({

                oldSolutionModel: null,
                currentSolutionModel: null,
                controlProcessingCompleted: false,
                secFileList: null,
                targetList: null,
                solSecurityFilesData: null,
                selectedFileDetails: null,
                solutionsController: null,
                alertContainer: null,
                previouslyRendered: false,
                
                domEvents: {
                    "click #securitySetupApply": "applySecuritySetup",
                    "click #securitySetupCancel": "cancelSecuritySetup"
                },

                initialize: function(options){
                    this.solutionsController = options.solutionsController || new SolutionsController({});
                    this.alertContainer = options.alertContainer || new LddAlertContainer();
                    _.bindAll(this);
                },
                
                cancelSecuritySetup: function(){                    
                    this.renderFileDetails();
                    this.disableButtons();
                },
                
                applySecuritySetup: function(){
                    this.disableButtons();
                    var collView = this.targetList.getCollectionView();
                    if(null != collView){
                        var items = collView.getItems();
                        var sourceItems = collView.getSourceItems();
 
                        for(var i=0; i<items.length; i++){
                            sourceItems[i].deployto = items[i].isSelected == true;
                        }
                    }

                    this.selectedFileDetails.config = this.$('#ssfcArea').val();

                    var currentSolutionName = this.currentSolutionModel.name;
                    var alertContainer = this.alertContainer;
                    var fileName = this.selectedFileDetails.name;
                    var successCallback = function(){
                        var alertOptionsSuccess = {
                            message: "Security setup file '"+ fileName +"' for " + currentSolutionName + " successfully saved.",
                            type: 'success'
                        };
                        var alertOptionsWarning = {
                            message: "Policy Update required for Device Groups affected by changes to " + currentSolutionName + ".",
                            type: 'warning',
                            buttons: [{text: "Go to Device Groups", close: true/*, onClick: function(){alert("TODO: Go to Device Groups");}*/}]
                        };
                        alertContainer.showAlert(alertOptionsSuccess);
                        alertContainer.showAlert(alertOptionsWarning);
                    }
                    
                    var failureCallback = function(){
                        var alertOptionsFailure = {
                            message: "Failed to save security setup file '"+ fileName +"' for " + currentSolutionName + ".",
                            type: 'error'
                        }
                        alertContainer.showAlert(alertOptionsFailure);
                    }
                    
                    this.solutionsController.saveSolutionUCFFile(this.currentSolutionModel, this.selectedFileDetails, successCallback, failureCallback);
                },

                changeFile: function(e, item){
                    this.selectedFileDetails = item[item.length-1].sourceItem;
                    this.renderFileDetails();
                    this.disableButtons();
                },
                
                createControls: function(solutionModel){
                    this.currentSolutionModel = solutionModel;
                },
                
                processControls: function() {
                    if(this.currentSolutionModel == null) return;
                    SolutionSecuritySetupViewTemplate.renderToView(this);
                    this.solSecurityFilesData =  this.currentSolutionModel.attributes.securitysetupfiles;
                    this.secFileList = new Controls.List(this.$('#securitySetupFileList'),this.solSecurityFilesData,{useMultiSelection: false});

                    var firstItem = this.secFileList.getCollectionView().getItems()[0];
                    this.secFileList.select(firstItem);
                    this.selectedFileDetails = firstItem.sourceItem;
                    
                    this.targetList = null;
                    this.renderFileDetails();

                    this.listenTo(this.secFileList, 'change:selection', this.changeFile);
                },
                
                renderFileDetails: function(){

                    var deviceTypes = this.selectedFileDetails.devicetypes;
                    var createItem = function(item){return item.sourceItem.type};
                    
                    if(this.targetList == null){
                        this.targetList = new Controls.List(this.$('#ssfdtList'), deviceTypes, {useCheckboxSelection: true,
                                                                                                useMultiSelection: true,
                                                                                                createItem: createItem});
                    }
                    else{
                        this.targetList.getCollectionView().setItems(deviceTypes);
                    }

                    var collectionView = this.targetList.getCollectionView();
                    var selectedItems = [];
                    for(var i=0; i < deviceTypes.length; i++){
                        if(deviceTypes[i].deployto){
                            selectedItems.push(collectionView.findByProperty('type', deviceTypes[i].type));
                        }
                    }
                    
                    this.targetList.select(selectedItems);
                    this.$('#ssfcArea').val(this.selectedFileDetails.config);
                    
                    that = this;
                    this.$('#ssfcArea').on('input', that.enableButtons);
                    this.listenTo(this.targetList, 'change:selection', that.enableButtons);
                },
                
                
                disableButtons: function(){
                    this.$('#securitySetupApply').prop('disabled', true);
                    this.$('#securitySetupCancel').prop('disabled', true);
                },
                
                enableButtons: function(){
                    this.$('#securitySetupApply').prop('disabled', false);
                    this.$('#securitySetupCancel').prop('disabled', false);
                },
                
                render: function(solutionModel){
                    if(null != solutionModel) this.currentSolutionModel = solutionModel;
                    this.processControls();
                    return this;
                }
            });
    }
);