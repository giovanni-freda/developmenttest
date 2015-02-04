define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/deviceGroupsView'],
    function ($, Core, Controls, _, DeviceGroupsView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                DeviceGroupsView.renderToView(this);

                return this;
            }
        });
    }
);
