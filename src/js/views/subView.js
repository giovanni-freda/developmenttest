define(['jquery', 'core', 'controls', 'underscore', '../businessObjectsDefinition', './solutionsView', 'template!../../content/subView', '../eventAggregator', './deviceGroupsView', './devicesView', './eFormsView', './homeView', './jobsView','./logsView', './reportsView', './scheduleView', './servicesView', './softwareClientGroupsView', './systemView', './licenseView','./systemUsernamePasswordView', './ldapView'],
    function ($, Core, Controls, _, BusinessObjectsDefinition, SolutionsView, SubViewTemplate, EventAggregator, DeviceGroupsView, DevicesView, EFormsView, HomeView, JobsView, LogsView, ReportsView, ScheduleView, ServicesView, SoftwareClientGroupsView, SystemView, LicenseView,SystemUsernamePasswordView, LdapView) {

        "use strict";

        return Core.View.extend({
            getChildViews: function (childViewList) {
                var childViews = {};

                var solutionsView = childViewList.solutionsView || new SolutionsView();
                var deviceGroupsView = childViewList.deviceGroupsView || new DeviceGroupsView();
                var devicesView = childViewList.devicesView || new DevicesView();
                var softwareClientGroupsView = childViewList.softwareClientGroupsView || new SoftwareClientGroupsView();
                var eFormsView = childViewList.eFormsView || new EFormsView();
                var homeView = childViewList.homeView || new HomeView();
                var systemView = childViewList.systemView || new SystemView();
                var servicesView = childViewList.servicesView || new ServicesView();
                var scheduleView = childViewList.scheduleView || new ScheduleView();
                var jobsView = childViewList.jobsView || new JobsView();
                var logsView = childViewList.logsView || new LogsView();
                var reportsView = childViewList.reportsView || new ReportsView();
                var licenseView = childViewList.licenseView || new LicenseView();
                var userandpwdView = childViewList.userandpwdView || new SystemUsernamePasswordView();
                var ldapView = childViewList.ldapView || new LdapView();

                childViews[BusinessObjectsDefinition.Home.toLowerCase()] = homeView;
                childViews[BusinessObjectsDefinition.System.toLowerCase()] = systemView;
                childViews[BusinessObjectsDefinition.Solutions.toLowerCase()] = solutionsView;
                childViews[BusinessObjectsDefinition.ClientSoftware.toLowerCase()] = softwareClientGroupsView;
                childViews[BusinessObjectsDefinition.Services.toLowerCase()] = servicesView;
                childViews[BusinessObjectsDefinition.DeviceGroups.toLowerCase()] = deviceGroupsView;
                childViews[BusinessObjectsDefinition.Devices.toLowerCase()] = devicesView;
                childViews[BusinessObjectsDefinition.Schedule.toLowerCase()] = scheduleView;
                childViews[BusinessObjectsDefinition.Jobs.toLowerCase()] = jobsView;
                childViews[BusinessObjectsDefinition.Logs.toLowerCase()] = logsView;
                childViews[BusinessObjectsDefinition.Reports.toLowerCase()] = reportsView;
                childViews[BusinessObjectsDefinition.EForms.toLowerCase()] = eFormsView;
                childViews[BusinessObjectsDefinition.Licenses.toLowerCase()] = licenseView;
                childViews[BusinessObjectsDefinition.UsernamePassword.toLowerCase()] = userandpwdView;
                childViews[BusinessObjectsDefinition.Ldap.toLowerCase()] = ldapView;

                return childViews;
            },

            defaultPaneContainerFactory: function (containerElement) {
                return new Controls.PaneContainer(containerElement );
            },

            initialize: function (options) {
                this.childViews = options.childViews || this.getChildViews(options.childViews || {});
                this.drawerView = options.drawerView;
                this.paneContainerFactory = options.paneContainerFactory || this.defaultPaneContainerFactory.bind(this);


                this.listenTo(EventAggregator, 'change:drawerSelected', this.drawerSelected.bind(this));
                this.listenTo(EventAggregator, 'change:taskSelected', this.taskSelected.bind(this));
                this.listenTo(EventAggregator, 'toggle:drawerView', this.toggleDrawerPane.bind(this));
            },

            setInspectorView: function(newInspectorView) {
                if(this.inspectorView) {
                    this.stopListening(this.inspectorView);
                    this.inspectorView.stopListening();
                }

                this.inspectorView = newInspectorView;

                if(this.inspectorView) {
                    this.inspectorView.onBecomingActive();
                    var that = this;
                    this.listenTo(this.inspectorView, "inspector:open", function() {that.setInspectorPaneVisiblity(true);});
                    this.listenTo(this.inspectorView, "inspector:close", function() {that.setInspectorPaneVisiblity(false);});
                    //this.listenTo(this.inspectorView, "inspector:change", function() {that.setInspectorPaneVisiblity(false);});
                }

                this.setInspectorPaneVisiblity(false);
            },

            drawerSelected: function (drawerSelected) {
                console.log("subView::drawerSelected::" + drawerSelected);

                this.currentChildView = this.childViews[drawerSelected];

                var emptyButtonDefinition = {centerButtons:[],rightButtons:[]};
                var toolbarDefinition = emptyButtonDefinition;

                if(this.currentChildView.toolbarDefinition)
                    toolbarDefinition = this.currentChildView.toolbarDefinition.getToolbarDefinition.bind(this.currentChildView.toolbarDefinition)();

                if(this.currentChildView.getInspectorView)
                    this.setInspectorView(this.currentChildView.getInspectorView(this.currentChildView));
                else
                    this.setInspectorView(null);

                this.toolbarDefinition = toolbarDefinition;

                EventAggregator.trigger("change:toolbarModel",this.toolbarDefinition );

                if(this.currentChildView.handleListSelected)
                    this.currentChildView.handleListSelected();
            },

            taskSelected: function (taskSelected) {
                if (this.currentChildView) {
                    if(this.currentChildView.handleTaskSelected)
                        this.currentChildView.handleTaskSelected(taskSelected);
                    this.render();
                }
            },

            toggleDrawerPane: function () {
                this.drawerPane.setVisibility(!this.drawerPane.isVisible);
            },

            setInspectorPaneVisiblity: function(visibility) {
                this.inspectorPane.setVisibility(visibility);
                if(visibility)
                    this.renderInspectorView();
            },

            renderPanes: function() {
                if(!this.paneContainer) {
                    var drawerElement = this.drawerView.render.bind(this.drawerView)().$element;
                    this.$element.html(SubViewTemplate.render());
                    var containerElement = this.$element;

                    this.paneContainer = this.paneContainerFactory(containerElement);
                    this.drawerPane = this.paneContainer.addPane(this.$(".nav-tree-section"), {dockType: 'left', minWidth: 150, maxWidth: 150, resizable: false });
                    this.subViewPane = this.paneContainer.addPane(this.$(".content-section"), {dockType: 'center', minWidth: 400});
                    this.inspectorPane = this.paneContainer.addPane(this.$(".content-inspector-section"), {dockType: 'right', minWidth: 200, visibility: false});
                    this.$(".nav-tree-section").html(drawerElement);
                }
            },

            renderChildView: function() {
                if (this.currentChildView) {
                    var centerElement = this.currentChildView.render.bind(this.currentChildView)().$element;
                    this.$(".content-section").html(centerElement);
                }
            },

            renderInspectorView: function() {
                if(this.inspectorView && this.inspectorView.isVisible) {
                    this.$(".inspector-content").children().detach();
                    var rightElement = this.inspectorView.render.bind(this.inspectorView)().$element;
                    rightElement.appendTo(this.$(".inspector-content"));
                }
            },


            render: function () {
                this.renderPanes();
                this.renderChildView();
                this.renderInspectorView();

                return this;
            }
        });
    }
);
