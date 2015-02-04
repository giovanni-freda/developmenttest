define(['jquery', 'core', 'controls', 'underscore', 'template!../../content/mainView', '../eventAggregator'],
    function ($, Core, Controls, _, MainTemplate, EventAggregator) {
        "use strict";

        return Core.View.extend({
            initialize: function (options) {
                this.drawerController = options.drawerController;
                this.subView = options.subView;
                this.mainToolbarView = options.mainToolbarView;
                this.toolbarController = options.toolbarController;
                this.paneContainerFactory = options.paneContainerFactory || this.defaultPaneContainerFactory.bind(this);

                this.listenTo(EventAggregator, "alert:new", this.resizeLayout.bind(this));
                this.listenTo(EventAggregator, "alert:close", this.resizeLayout.bind(this));
            },

            defaultPaneContainerFactory: function (paneContainerElement) {
                return new Controls.PaneContainer(paneContainerElement);
            },

            resizeLayout: function() {
                this.mainToolbarView.onResize();
                this.paneContainer.invalidate();
            },

            renderPanes: function () {
                var subViewElement = this.subView.render.bind(this.subView)().$element;

                var toolbarElement = this.mainToolbarView.render.bind(this.mainToolbarView)().$element;

                var mainViewContainerDiv = this.$element;

                this.paneContainer = this.paneContainerFactory(mainViewContainerDiv);

                this.subViewPane = this.paneContainer.addPane(subViewElement, {dockType: 'center', minWidth: 400});
                this.toolbarPane = this.paneContainer.addPane(toolbarElement, {dockType: 'top' , isResizable: false });
            },

            render: function () {
                this.$element.html(MainTemplate.render());

                this.renderPanes();
                return this;
            }
        });
    }
);
