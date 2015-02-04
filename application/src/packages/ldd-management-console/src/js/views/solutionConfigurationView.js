define(['jquery', 'core', 'underscore', 'template!../../content/solutionConfigurationView', '../solutionsController'],
    function ($, Core, _, SolutionConfigurationViewTemplate, SolutionsController ) {


            return Core.View.extend({
                configData: {},
                changedConfigData: {},
                controlProcessingCompleted: false,
                solutionModel: null,
                solutionsController: null,
                
                domEvents: {
                   'click #configurationApply': 'applySolution',
                   'click #configurationReset': 'resetSolution',
                   'keyup #configurationList input[type="text"]': 'updateSolution',
                   'keyup #configurationList input[type="password"]': 'updateSolution',
                   'change #configurationList select': 'updateSolution',
                   'change #configurationList input[type="checkbox"]': 'updateSolution'
                },

                initialize: function( options ){
                	this.solutionsController = options.solutionsController || new SolutionsController({});
                    _.bindAll(this);
                },

                render: function(solutionModel){
                    if (!this.controlProcessingCompleted) {
                        this.once('controlProcessingCompleted', this.render, this);
                        return this;
                        
                    } else {
                        SolutionConfigurationViewTemplate.renderToView(this, this.configData);
                        this.delegateEvents();
                        this.$('#configurationApply').prop('disabled', true);
                        return this;
                    }
                },

                fireProcessControlCompleted: function() {
                    this.controlProcessingCompleted = true;
                    this.trigger('controlProcessingCompleted');
                    
                },

                createControls: function(solutionModel) {
                    this.solutionModel = solutionModel;
                    this.processControls(this.solutionModel, this.fireProcessControlCompleted.bind(this));
                    
                },

                processControls: function(solutionModel, callback) {
                    //for each solution configuration in solution
                    //create control, add to html (but do not attach to dom)

                    var solConfigurationData =  solutionModel.attributes.configs;

                    this.configData.rows = [];

                    for(var i=0; i < solConfigurationData.length; i++){
                        var configType = solConfigurationData[i].descriptor.type;
                        var configName = solConfigurationData[i].name;
                        var configLDDName = solConfigurationData[i].LDDName;
                        var configDefault = solConfigurationData[i].defaultvalue;
                        var configInput = '';

                        if ( configType == "combobox" || configType == "listbox") {
                            var pullDownValues = solConfigurationData[i].descriptor.possibleValues;
                            configInput = '<select name="' + configLDDName + '"';
                            if ( configType == "listbox" ) {
                            	configInput += ' size="5" multiple';  
                            }
                            configInput +=  ' >';

                            for (var b=0, tot=pullDownValues.length; b < tot; b++) {
                                configInput += '<option value="' + pullDownValues[b] + '"';

                                if ( pullDownValues[b] == solConfigurationData[i].defaultvalue ) {
                                    configInput += ' selected'
                                }

                                configInput += '>' + pullDownValues[b] + '</option>'
                            }
                            configInput += '</select>'

                        } else if ( configType == "passwordfield") {
                            configInput = '<input type="password" name="' + configLDDName + '" value="' + configDefault + '" >';
                        } else if ( configType == "checkbox") {
                            configInput = '<input type="checkbox" name="' + configLDDName + '"';
                            if ( configDefault == "true" ) {
                                configInput += ' checked' 
                            }
                            configInput += ' >';
                            
                        } else if ( configType == "binarystring") {
                        } else {
                            configInput = '<input type="text" name="' + configLDDName + '" value="' + configDefault + '" >';
                        }

                        this.configData.rows.push({ name: configName, lddName: configLDDName, htmlString: configInput, dirty:false, defaultvalue: configDefault });
                    }

                    callback();
                },

                resetSolution: function(){
                   this.controlProcessingCompleted = true;
                   this.once('controlProcessingCompleted', this.render, this);
                   this.createControls( this.solutionModel );
                   this.$('#configurationApply').prop('disabled', true);

                },

                applySolution: function(){
                    for (var i=0, tot=this.configData.rows.length; i < tot; i++) {
                        if ( this.configData.rows[i].dirty == true ) {
                        	var configValue = [];
                        	var newValue = '';
                            var controlName = this.configData.rows[i].lddName;
                            var controlNameSelector = '[name="' + controlName + '"]';
                            var inputElement = this.$(controlNameSelector);
                        	if ( inputElement.is(':checkbox') === true) {
                        		newValue = this.$('input' + controlNameSelector).is(':checked') ? "true" : "false";
                        	} else if ( inputElement.is('select') === true) {
                        		newValue = this.$('select' + controlNameSelector + ' option:selected').val();
                        	} else if ( inputElement.is(':text') === true ||
                        		        inputElement.is(':password') === true){
                        		newValue = this.$('input' + controlNameSelector ).val();
                        	}


                            configValue[0] = newValue;
                            this.changedConfigData[controlName] = configValue;
                        }
                    }
                    this.solutionsController.saveSolutionConfigSettings(this.solutionModel, this.changedConfigData,this.successCallBack.bind(this));
                },

                updateSolution: function(e){
                    var newValue = e.target.value;
                    if ( e.target.type == "checkbox") {
                        newValue =  e.target.checked ? "true" : "false";
                    }

                    for (var i=0, tot=this.configData.rows.length; i < tot; i++) {
                        if ( this.configData.rows[i].lddName == e.target.name ) {
                        	if ( newValue != this.configData.rows[i].defaultvalue ) { 
                              this.configData.rows[i].dirty = true;
                            }
                            else {
                            	this.configData.rows[i].dirty = false;
                            }
                            this.$('#configurationApply').prop('disabled', false);
                            break;
                        }
                    }
                },

                successCallBack: function(){
                    this.$('#configurationApply').prop('disabled', true);
                    this.solutionModel.fetch({error: function() {this.trigger("error", "unable to fetch solution from server")}});
                    this.changedConfigData = {};
                    this.controlProcessingCompleted = true;
                 }
            });
    }
);