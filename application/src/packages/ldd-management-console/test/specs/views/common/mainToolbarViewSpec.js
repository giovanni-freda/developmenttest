define(['../../../../src/js/views/mainToolbarView', '../../../../src/js/eventAggregator', 'core', 'jquery'], function (MainToolbarView, EventAggregator, Core, $) {
    "use strict";

    describe('Main Toolbar View', function () {
        var mainToolbarView;

        describe('when rendering', function () {
            beforeEach(function () {
                mainToolbarView = new MainToolbarView({});
            });

            afterEach(function() {
                mainToolbarView.stopListening();
            });

            it('should generate a toolbar', function () {
                mainToolbarView.render();
                expect(mainToolbarView.toolbarControl).toBeTruthy();
            })
        });

        describe('when clicking drawer close', function() {
            var callback ;
            beforeEach(function() {
                mainToolbarView = new MainToolbarView({});
                callback = sinon.spy();
                EventAggregator.on("toggle:drawerView", callback)
            })

            afterEach(function() {
                EventAggregator.off("toggle:drawerView");
                mainToolbarView.stopListening();
            });

            it('should trigger toggle:drawerView', function() {
                mainToolbarView.onDrawerCloseClick();
                expect(callback.calledOnce).toBeTruthy();
            });
        });

        describe('when resizing', function() {
            var mockedToolbarControl = null;

            beforeEach(function () {
                mockedToolbarControl = {};
                mockedToolbarControl.invalidate = sinon.spy();

                mainToolbarView = new MainToolbarView({
                    toolbarCreationFactory: function() {return mockedToolbarControl;}
                });
            });
            afterEach(function() {
                mainToolbarView.stopListening();
            });
            it('should invalidate toolbar control', function() {
                mainToolbarView.render();
                mainToolbarView.onResize();
                expect(mockedToolbarControl.invalidate.calledOnce).toBeTruthy();
            });
        });

        describe('toolbar buttons', function() {
            var testToolbarModel;
            var mockedToolbarControl;

            beforeEach(function() {

                testToolbarModel = {
                    centerButtons :
                    [
                        {title: "Install" ,id: "install", disabled: false, icon: "install icon-add" , event: 'install'},
                        {title: "Remove" ,id: "remove", disabled: false, icon: "remove icon-remove", event: 'remove' }
                    ],
                    rightButtons :
                    [
                        /* NOTE: May want to change these events to more generic moniker's waiting for second / third usage */
                        {title: "Summary" ,id: "summaryButton", disabled: true, icon: "summaryIcon icon-contextual_menu" , event: 'summary'},
                        {title: "Configuration" ,id: "configurationButton", disabled: true, icon: "configurationIcon icon-gear" , event: 'configuration'},
                    ]
                }

                mockedToolbarControl = {};
                mockedToolbarControl.invalidate = sinon.spy();
            });

            afterEach(function() {

            });

            describe('with center and right buttons', function() {
                beforeEach(function() {
                    mainToolbarView = new MainToolbarView({
                        toolbarCreationFactory: function() {return mockedToolbarControl;}
                    });
                    mainToolbarView.setNewToolbarModel(testToolbarModel)
                });

                afterEach(function() {
                    mainToolbarView.setNewToolbarModel(null);
                    mainToolbarView.stopListening();
                });

                describe('enableActionsMenu', function() {
                    describe('when enabling', function() {
                        it('should set disabled false on each button', function() {
                            mainToolbarView.render();
                            mainToolbarView.enableActionsMenu(true);
                            $.each(testToolbarModel.rightButtons, function(key, currentButton){
                                expect(mainToolbarView.$('#' + currentButton.id).prop("disabled")).toBe(false);
                            });
                        });
                    });

                    describe('when disabling', function() {
                        it('should set disabled true on each button', function() {
                            mainToolbarView.enableActionsMenu(false);
                            $.each(testToolbarModel.rightButtons, function(key, currentButton){
                                expect(mainToolbarView.$('#' + currentButton.id).prop("disabled")).toBe(true);
                            });
                        });
                    });
                });

                it('when binding Buttons should call bind button for each', function(){
                    var bindButtonEventSpy = sinon.spy(mainToolbarView, "bindButtonEvent");

                    mainToolbarView.render();

                    expect(bindButtonEventSpy.callCount).toBe(testToolbarModel.centerButtons.length + testToolbarModel.rightButtons.length);
                    bindButtonEventSpy.restore();
                });

                it('when binding a button Event should register callback for notification', function(){

                    var callback = sinon.spy();

                    mainToolbarView.render();
                    EventAggregator.on(testToolbarModel.centerButtons[0].event, callback);
                    mainToolbarView.$('#' + testToolbarModel.centerButtons[0].id).trigger('click');
                    EventAggregator.off(testToolbarModel.centerButtons[0].event, callback);


                    expect(callback.calledOnce).toBeTruthy();
                });

                it('when unbinding Buttons', function(){
                    var removeButtonEventSpy = sinon.spy(mainToolbarView, "removeButtonEvent");

                    mainToolbarView.render();

                    expect(removeButtonEventSpy.callCount).toBe(testToolbarModel.centerButtons.length + testToolbarModel.rightButtons.length);
                    removeButtonEventSpy.restore();
                });

                it('when unbinding a button Event', function(){
                    var callback = sinon.spy();
                    mainToolbarView.render();
                    EventAggregator.on(testToolbarModel.centerButtons[0].event, callback);
                    mainToolbarView.removeButtonEvent(testToolbarModel.centerButtons[0]);
                    mainToolbarView.$('#' + testToolbarModel.centerButtons[0].id).trigger('click');
                    EventAggregator.off(testToolbarModel.centerButtons[0].event);
                    expect(callback.calledOnce).toBe(false);
                });
            });

            describe('with center', function() {
                beforeEach(function() {

                    testToolbarModel = {
                        centerButtons :
                            [
                                {title: "Install" ,id: "install", disabled: false, icon: "install icon-add" , event: 'install'},
                                {title: "Remove" ,id: "remove", disabled: false, icon: "remove icon-remove", event: 'remove' }
                            ]
                    }
                    mainToolbarView = new MainToolbarView({
                        toolbarCreationFactory: function() {return mockedToolbarControl;}
                    });
                    mainToolbarView.setNewToolbarModel(testToolbarModel)
                });

                afterEach(function() {
                    mainToolbarView.setNewToolbarModel(null);
                    mainToolbarView.stopListening();
                });

                describe('enableActionsMenu', function() {

                    it('should return', function() {
                        var spy = sinon.spy(mainToolbarView, "enableActionButton");
                        mainToolbarView.render();
                        mainToolbarView.enableActionsMenu(true);
                        expect(spy.callCount).toBe(0);
                        spy.restore();
                    });
                });

                it('when binding Buttons should call bind button for each', function(){
                    var bindButtonEventSpy = sinon.spy(mainToolbarView, "bindButtonEvent");

                    mainToolbarView.render();

                    expect(bindButtonEventSpy.callCount).toBe(testToolbarModel.centerButtons.length);
                    bindButtonEventSpy.restore();
                });

                it('when binding a button Event should register callback for notification', function(){

                    var callback = sinon.spy();
                    mainToolbarView.render();
                    EventAggregator.on(testToolbarModel.centerButtons[0].event, callback);
                    mainToolbarView.$('#' + testToolbarModel.centerButtons[0].id).trigger('click');
                    EventAggregator.off(testToolbarModel.centerButtons[0].event, callback);

                    expect(callback.calledOnce).toBeTruthy();
                });

                it('when unbinding Buttons', function(){
                    var removeButtonEventSpy = sinon.spy(mainToolbarView, "removeButtonEvent");

                    mainToolbarView.render();

                    expect(removeButtonEventSpy.callCount).toBe(testToolbarModel.centerButtons.length);
                    removeButtonEventSpy.restore();
                });

                it('when unbinding a button Event', function(){
                    var callback = sinon.spy();
                    mainToolbarView.render();
                    EventAggregator.on(testToolbarModel.centerButtons[0].event, callback);
                    mainToolbarView.removeButtonEvent(testToolbarModel.centerButtons[0]);
                    mainToolbarView.$('#' + testToolbarModel.centerButtons[0].id).trigger('click');
                    EventAggregator.off(testToolbarModel.centerButtons[0].event);
                    expect(callback.calledOnce).toBe(false);
                });
            });


        });
    });
});