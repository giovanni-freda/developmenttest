define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/softwareClientGroupsView'],
    function ($, Core, Controls, _, SoftwareClientGroupsView) {

        "use strict";

        return Core.View.extend({
            initialize: function (options) {
            },

            render: function () {
                SoftwareClientGroupsView.renderToView(this);

                return this;
            }
        });
    }
);
