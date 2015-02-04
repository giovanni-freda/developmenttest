define(['jquery', 'core', 'controls', 'underscore', '../../eventAggregator'],
    function ($, Core, Controls, _, EventAggregator) {

        "use strict";

        return Core.View.extend({

            validateChildViews: function(childViews) {
                if(!childViews)
                    throw "No child views given to tabbed inspector view";
                $.each(childViews, function(index, currentView) {
                    var childViewDefinitionFilterResults = childViews.filter(
                        function (childViewDefinition) {
                            return childViewDefinition.eventTrigger.toLowerCase() === currentView.eventTrigger.toLowerCase()
                        }, this);
                    if(childViewDefinitionFilterResults.length > 1)
                        throw "Cannot have two views with the same eventTrigger";
                })
            },

            initializeTabbedInspectorView: function (options) {
                this.validateChildViews(options.childViews);
                this.childViews = options.childViews;
                this.currentView = null;
                this.isVisible = false;
            },

            onBecomingActive: function() {
                this.currentView = undefined;
                this.isVisible = false;
                this.bindChildViewSwitchEvents();
            },

            bindChildViewSwitchEvents: function() {
                //this.listenTo(EventAggregator, "inspector:viewSelected", this.handleViewSelected.bind(this));
                $.each(this.childViews, function(index,childViewDefinition) {
                    this.listenTo(EventAggregator, childViewDefinition.eventTrigger, function() {
                        this.handleViewSelected(childViewDefinition.eventTrigger)
                    }.bind(this));
                }.bind(this));
            },

            render: function (model) {
                this.$element.addClass("fullDiv");
                this.$element.children().detach();


                if(this.currentView) {
                    var inspectorContent = this.currentView.render.bind(this.currentView)(model).$element;
                    inspectorContent.appendTo(this.$element);
                }

                return this;
            },

            isChildViewDefinition: function(childViewDefinition, eventTrigger) {
                return childViewDefinition.eventTrigger.toLowerCase() === eventTrigger.toLowerCase()
            },

            getChildView: function (eventTrigger) {
                var childViewDefinitionFilterResults = this.childViews.filter(
                    function (childViewDefinition) {
                        return this.isChildViewDefinition(childViewDefinition, eventTrigger);
                    }, this);
                return childViewDefinitionFilterResults;
            },

            triggerInspectorOpen: function() {
                if(this.isVisible == false) {
                    this.isVisible = true;
                    this.trigger("inspector:open");
                }
                else
                    this.render();
            },

            triggerInspectorClose: function() {
                this.isVisible = false;
                this.trigger("inspector:close");
                this.currentView = null;
            },

            handleViewSelected: function (eventTrigger) {
                var taskViewDefinitionFilterResults = this.getChildView(eventTrigger);

                if(taskViewDefinitionFilterResults.length > 1 || taskViewDefinitionFilterResults.length == 0)
                    throw "No view found with event trigger: " + eventTrigger;

                if(this.currentView == taskViewDefinitionFilterResults[0].view) {
                    this.currentView = null;
                    this.triggerInspectorClose();
                }
                else {
                    this.currentView = taskViewDefinitionFilterResults[0].view;
                    this.triggerInspectorOpen();
                }
            }
        });
    }
);
