define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/homeView'],
    function ($, Core, Controls, _, HomeView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                HomeView.renderToView(this);

                return this;
            }
        });
    }
);
