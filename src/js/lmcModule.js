"use strict";

define([
    'core',
    './views/mainView',
    './views/drawerView',
    './views/subView',
    './views/mainToolbarView',
    './drawerController',
    './handlebarsHelpers',
    'require',
    'jquery'
],
    function (Core, MainView, DrawerView, SubView, MainToolbarView, DrawerController, HandlebarsHelpers, req, $) {

        return Core.Module.extend({
            drawerController: null,

            mainView: null,
            drawerView: null,
            subView: null,

            path: 'lmc', //Todo: Make sure this is correct, all of your routes will be prefixed with this value

            icon: {
                className: 'icon-FPO_circle_filled',
                text: 'LDD Management Console'
            },

            initialize: function (options) {
                if (options.mainView)
                    this.mainView = options.mainView;
                if (options.drawerView)
                    this.drawerView = options.drawerView;
                if (options.subView)
                    this.subView = options.subView;
                if (options.drawerController)
                    this.drawerController = options.drawerController;
                if (options.mainToolbarView)
                    this.mainToolbarView = options.mainToolbarView;

                console.log('initialize');
                HandlebarsHelpers.registerHandleBarsHelpers();
            },

            routes: {
                '': 'home',
                ':businessObjectType' : 'showBusinessObjectType'
            },

            showBusinessObjectType: function(businessObjectTypeName) {
                this.drawerController.setBusinessObjectType(businessObjectTypeName);
            },

            home: function () {
                this.showBusinessObjectType("home");
            },

            //module defines an init, that gets triggered before user is connected, so we call setup from connected..
            setup: function () {
                this.drawerController = this.drawerController || new DrawerController();

                this.drawerView = this.drawerView || new DrawerView();
                this.subView = this.subView || new SubView({
                    drawerView: this.drawerView
                });

                this.mainToolbarView = this.mainToolbarView || new MainToolbarView();

                this.mainView = this.mainView || new MainView({
                    drawerController: this.drawerController,
                    drawerView: this.drawerView,
                    subView: this.subView,
                    mainToolbarView: this.mainToolbarView
                });

            },

            connected: function () {
                this.setup();
                this.$element.html(this.mainView.render.bind(this.mainView)().$element);
            }
        });
    });