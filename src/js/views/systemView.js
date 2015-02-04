define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/systemView'],
    function ($, Core, Controls, _, SystemView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                SystemView.renderToView(this);

                return this;
            }
        });
    }
);
