define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/mainToolbarView', '../eventAggregator', './lddAlertContainer'],
    function ($, Core, Controls, _, MainToolbarTemplate, EventAggregator, LddAlertContainer) {
        "use strict";

        return Core.View.extend({

            initialize: function (options) {
               this.toolbarButtonDefinition = null;

               this.toolbarCreationFactory = options.toolbarCreationFactory || this.defaultToolbarCreationFactory.bind(this);
               this.listenTo(EventAggregator, "change:toolbarModel", this.setNewToolbarModel.bind(this));
               this.listenTo(EventAggregator, "actionsMenu:enable", this.enableActionsMenu.bind(this));
            },

            defaultToolbarCreationFactory: function (toolbarElement) {
                return  new Controls.Toolbar(toolbarElement);
            },

            setNewToolbarModel: function(toolbarModel) {
                this.toolbarButtonDefinition = toolbarModel;
                this.render();
            },

            onDrawerCloseClick: function() {
                EventAggregator.trigger("toggle:drawerView");
            },

            generateButtonArray : function(toolbarButtonDefinition) {
                var buttonArray = [toolbarButtonDefinition.centerButtons];

                if(toolbarButtonDefinition.rightButtons)
                    buttonArray.push(toolbarButtonDefinition.rightButtons);

                return buttonArray;
            },

            bindButtonEvents : function() {
                //coalesce arrays into double stacked array, loop through each array binding buttons
                if(this.toolbarButtonDefinition) {
                    var buttonArray = this.generateButtonArray(this.toolbarButtonDefinition);

                    $.each(buttonArray, function(key, currentButtonList){
                        $.each(currentButtonList, function(key, currentButton){
                            this.bindButtonEvent(currentButton);
                        }.bind(this));
                    }.bind(this));
                }
            },

            triggerButtonEvent: function(event) {
                    console.log('mainToolbarView::buttonEvent::' + event.data.buttonDefinition.event);
                    EventAggregator.trigger(event.data.buttonDefinition.event );

            },

            bindButtonEvent: function(buttonDefinition) {
                //grab icon from button def, bind on-click to fire event against EA
                this.$('#' + buttonDefinition.id).on('click', {buttonDefinition : buttonDefinition}, this.triggerButtonEvent);
            },

            removeButtonEvents: function() {

                if(this.toolbarButtonDefinition) {
                    //coalesce arrays into double stacked array, loop through each array binding buttons
                    var buttonArray = this.generateButtonArray(this.toolbarButtonDefinition);

                    $.each(buttonArray, function(key, currentButtonList){
                        $.each(currentButtonList, function(key, currentButton){
                            this.removeButtonEvent(currentButton);
                        }.bind(this));
                    }.bind(this));
                }

            },

            removeButtonEvent: function(buttonDefinition) {
                this.$('#' + buttonDefinition.id).off('click', this.triggerButtonEvent);
            },

            render: function () {
                if(this.$("#drawerClose").length)
                    this.$("#drawerClose").unbind()

                if(this.toolbarControl) {
                    this.removeButtonEvents();
                    delete this.toolbarControl;
                }


                this.$element.html(MainToolbarTemplate.render(this.toolbarButtonDefinition));

                this.toolbarControl = this.toolbarCreationFactory(this.$("#mainToolbarView"));

                this.bindButtonEvents.bind(this)();

                this.$("#drawerClose").click(this.onDrawerCloseClick.bind(this));

                this.alertContainerView = new LddAlertContainer();
                this.$('#alert-containerid').html(this.alertContainerView.render().$element);

                return this;
            },

            enableActionButton: function(enabled, currentButton) {
                this.$('#' + currentButton.id).prop("disabled", !enabled);
            },

            enableActionsMenu: function (enabled) {
                if(!this.toolbarButtonDefinition.rightButtons)
                    return;

                $.each(this.toolbarButtonDefinition.rightButtons, function(key, currentButton){
                    this.enableActionButton(enabled, currentButton);
                }.bind(this));
            },

            onResize: function() {
                this.toolbarControl.invalidate();
            }
        });
    }
);
