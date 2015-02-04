define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/jobsView'],
    function ($, Core, Controls, _, JobsView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                JobsView.renderToView(this);

                return this;
            }
        });
    }
);
