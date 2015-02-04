define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/servicesView'],
    function ($, Core, Controls, _, ServicesView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                ServicesView.renderToView(this);

                return this;
            }
        });
    }
);
