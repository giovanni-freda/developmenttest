define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/devicesView'],
    function ($, Core, Controls, _, DevicesView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                DevicesView.renderToView(this);

                return this;
            }
        });
    }
);
