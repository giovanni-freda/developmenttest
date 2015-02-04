define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/alertContainer', '../eventAggregator'],
    function ($, Core, Controls, _, AlertContainerTemplate, EventAggregator) {
        "use strict";

        var alertContainer;

        return Core.View.extend({
            initialize: function () {
                console.log('alert container initialized........');
            },

            render: function () {
                console.log("alert container::render called.");

                AlertContainerTemplate.renderToView(this);

                var alertElement = this.$('#alert-location-container');
                alertContainer = new Controls.AlertContainer(alertElement);

                return this;
            },

            showAlert: function (options) {
                console.log('in alert section.........');
                options.className = "lddalert";
                var originalOnClose = options.onClose;
                options.originalOnClose = originalOnClose;
                options.onClose = function() {
                    if(options.originalOnClose)
                        options.originalOnClose()
                    EventAggregator.trigger("alert:close");
                }
                var alert = alertContainer.showAlert(options);
                EventAggregator.trigger("alert:new");
                return alert;
            }
        });
    });