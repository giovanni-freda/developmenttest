define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/reportsView'],
    function ($, Core, Controls, _, ReportsView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                ReportsView.renderToView(this);

                return this;
            }
        });
    }
);
