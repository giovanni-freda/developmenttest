define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/scheduleView'],
    function ($, Core, Controls, _, ScheduleView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                ScheduleView.renderToView(this);

                return this;
            }
        });
    }
);
