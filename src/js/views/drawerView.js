define(['core', 'underscore', 'template!../../content/drawerView', 'controls', '../drawerController', '../businessObjectsDefinition', '../eventAggregator'],
    function (Core, _, DrawerViewTemplate, Controls, DrawerController, BusinessObjectsDefinitions, EventAggregator) {
        'use strict';

        return Core.View.extend({

            location: null,

            initialize: function (options) {
                this.drawerController = options.controller || new DrawerController();
                this.session = options.session || Core.App.session;
                this.createDrawerList = options.createDrawerList || this.defaultCreateDrawerList.bind(this);

                this.location = options.location || Core.Location;
            },

            defaultCreateDrawerList : function(element, items , options) {
                return new Controls.List(element, items, options);
            },

            getListItems: function () {
                if (!this.listItems) {
                    this.listItems = [];

                    for (var key in BusinessObjectsDefinitions) {
                        this.listItems.push({name: BusinessObjectsDefinitions[key] });
                    }
                }
                return this.listItems;
            },

            render: function () {
                this.$element.html(DrawerViewTemplate.render());
                var options = {};
                var listItems = this.getListItems();

                if (this.businessObjectList) {
                    this.businessObjectList.stopListening();
                    delete this.businessObjectList;
                }

                this.businessObjectList = this.createDrawerList(this.$('#drawerList'), listItems, options);
                this.listenTo(this.businessObjectList, "change:selection", this.onBusinessObjectSelected.bind(this));

                return this;
            },

            onBusinessObjectSelected: function (e, items) {
                this.drawerController.setBusinessObjectType(items.filter(function (item) {
                    return item.isSelected
                })[0].name);
            },

            selectBusinessObjectType: function (buisnessObjectTypeName) {
                var businessObjectListCollection = this.businessObjectList.getCollectionView();
                var matchingBusinessObjects = businessObjectListCollection.findByProperty('name', buisnessObjectTypeName);

                this.businessObjectList.select(matchingBusinessObjects);
            }
        });
    });
