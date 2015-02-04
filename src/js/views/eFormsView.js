define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/eFormsView'],
    function ($, Core, Controls, _, EFormsView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                EFormsView.renderToView(this);

                return this;
            }
        });
    }
);
