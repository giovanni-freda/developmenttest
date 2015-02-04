define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/logsView'],
    function ($, Core, Controls, _, LogsView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                LogsView.renderToView(this);

                return this;
            }
        });
    }
);
