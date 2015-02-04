define(['../../../src/js/solutionsController', 'core', '../../../src/js/eventAggregator', '../../../src/js/models/solutionModel'], function (SolutionsController, Core, EventAggregator, SolutionModel) {

    "use strict";

    describe('Solutions Controller', function () {
        var solutionsController;
        var mockLocation;
        var mockSession;
        beforeEach(function () {
            mockLocation = {
                navigate: sinon.spy()
            };
            mockSession = {
                isActive: sinon.stub().returns(false)
            };
            Core.Events.enableFor(mockSession);

            solutionsController = new SolutionsController({session: mockSession});
        });

        describe('should get solutionSummaryModel', function () {
            it('should call fetch', function () {

                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                var testCallback = sinon.spy();

                solutionsController.getSolutionSummaryModel('test', testCallback);

                //this "responds" to the request so the appropriate callback can be called
                requests[0].respond(200, { "Content-Type": "application/json" },
                    '[{ "id": 12, "comment": "Hey there" }]');

                expect(testCallback.calledOnce).toBeTruthy();
            });
        });
        
        describe('when a solution security setup file is successfully PUT', function(){
            it('should call the successCallback function', function(){
                var server = sinon.fakeServer.create();
                var successCallback = sinon.spy();
                var failureCallback = sinon.spy();
                server.respondWith("{}");
                
                var solutionModel = new SolutionModel();
                solutionModel.attributes.name = "testSolution";
                
                solutionsController.saveSolutionUCFFile(solutionModel, {"name": "testFile"}, successCallback, failureCallback);
                
                server.respond();
                
                expect(successCallback.calledOnce).toBeTruthy();
                    
                
            });
        });
        
        describe('when a solution security setup file is not successfully PUT', function(){
            it('should call the failureCallback function', function(){
                var server = sinon.fakeServer.create();
                var successCallback = sinon.spy();
                var failureCallback = sinon.spy();
                server.respondWith([400, {}, "Bad Request"]);
                
                var solutionModel = new SolutionModel();
                solutionModel.attributes.name = "testSolution";
                
                solutionsController.saveSolutionUCFFile(solutionModel, {"name": "testFile"}, successCallback, failureCallback);
                
                server.respond();
                
                expect(failureCallback.calledOnce).toBeTruthy();
                    
                
            });
        });
        
        describe('should trigger error if fetch fails', function() {
            var errorCallback;
            beforeEach(function () {
                errorCallback = sinon.spy();
                solutionsController.on("error", errorCallback);
            });

            afterEach(function () {
                solutionsController.off("error", errorCallback);
                errorCallback = null;
            });

            it('should call fetch', function () {
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                var testCallback = sinon.spy();

                solutionsController.getSolutionSummaryModel('test', testCallback);

                //this "responds" to the request so the appropriate callback can be called
                requests[0].respond(401, { "Content-Type": "application/json" },
                    '[{ "id": 12, "comment": "Hey there" }]');

                expect(errorCallback.calledOnce).toBeTruthy();
            });
        });

        describe('should generate correct drawer Model', function () {
            var solutionModel;
            var drawerModel;
            var serverUrl;
            beforeEach(function () {
                solutionModel = {id: 0, attributes: {}};
                solutionModel.id = 0;
                solutionModel.attributes.name = "test";
                drawerModel = solutionsController.getDrawerModel(solutionModel);
                if (Core.App.config.LddContent && Core.App.config.LddContent.serverUrl) {
                    serverUrl = Core.App.config.LddContent.serverUrl;
                } else {
                    serverUrl = Core.App.config.serverUrl;
                }

            });

            it('should set correct name', function () {
                expect(drawerModel.name).toBe(solutionModel.attributes.name);
            });

            it('should have correct # of tasks', function () {
                expect(drawerModel.tasks.length).toBe(2);
            });

            it('should have correct configuration task', function () {
                expect(drawerModel.tasks[0].name).toBe("Configuration");
                expect(drawerModel.tasks[0].url).toBe(serverUrl + "solutions/0/configuration");

            });

            it('should have correct security setup task', function () {
                expect(drawerModel.tasks[1].name).toBe("Security Setup Files");
                expect(drawerModel.tasks[1].url).toBe(serverUrl + "solutions/0/securitySetup");
            });
        });

        describe('should return correct grid columns', function () {
            it('has correct columns', function () {
                var solutionGridColumns = solutionsController.getSolutionGridColumns();
                expect(solutionGridColumns.length).toBe(4);
                expect(solutionGridColumns[0].name).toBe('Solution Name');
                expect(solutionGridColumns[0].propertyName).toBe('name');
                expect(solutionGridColumns[1].name).toBe('Version');
                expect(solutionGridColumns[1].propertyName).toBe('version');
                expect(solutionGridColumns[2].name).toBe('Install Time');
                expect(solutionGridColumns[2].propertyName).toBe('installtime');
                expect(solutionGridColumns[3].name).toBe('Update Time');
                expect(solutionGridColumns[3].propertyName).toBe('updatetime');
            });
        });

        describe('has Solutions', function () {
            var mockSolutionCollection;
            beforeEach(function () {
                mockLocation = {
                    navigate: sinon.spy()
                };
                mockSession = {
                    isActive: sinon.stub().returns(false)
                };
                Core.Events.enableFor(mockSession);
                mockSolutionCollection = {};

            });

            it('returns true when collection has items', function () {
                mockSolutionCollection.length = 1;
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                expect(solutionsController.hasSolutions()).toBeTruthy();
            });
            it('returns false when collection has no items', function () {
                mockSolutionCollection.length = 0;
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                var result = solutionsController.hasSolutions();
                expect(result).not.toBe(true);
            });
        });

        describe('can load solutions', function () {
            var errorCallback;
            var mockSolutionCollection;
            var testCallback ;
            beforeEach(function () {
                errorCallback = sinon.spy();
                mockSolutionCollection = {};
                mockSolutionCollection.fetch = sinon.spy();
                mockSession.isActive =  sinon.stub().returns(true);
                solutionsController = new SolutionsController({session: mockSession, solutionCollection: mockSolutionCollection});
                solutionsController.on("error", errorCallback);
                testCallback = sinon.spy();
            });

            afterEach(function () {
                solutionsController.off("error", errorCallback);
                errorCallback = null;
            });

            it('should load when session is active', function() {
                mockSession.isActive =  sinon.stub().returns(false);
                solutionsController = new SolutionsController({session: mockSession, solutionCollection: mockSolutionCollection});
                solutionsController.loadSolutions({success: testCallback});
                expect(testCallback.calledOnce).toBeFalsy();
                mockSession.isActive = sinon.stub().returns(true);
                mockSession.trigger("begin")
                expect(mockSolutionCollection.fetch.calledOnce).toBeTruthy();
            });

            it('should call success', function () {
                solutionsController = new SolutionsController({session: mockSession});
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                var testCallback = sinon.spy();

                solutionsController.loadSolutions({success: testCallback});

                //this "responds" to the request so the appropriate callback can be called
                requests[0].respond(200, { "Content-Type": "application/json" },
                    '[{ "id": 12, "comment": "Hey there" }]');

                expect(testCallback.calledOnce).toBeTruthy();
            });

            it('should call error', function () {
                solutionsController = new SolutionsController({session: mockSession});
                solutionsController.on("error", errorCallback);
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                var testCallback = sinon.spy();

                solutionsController.loadSolutions({success: testCallback});

                //this "responds" to the request so the appropriate callback can be called
                requests[0].respond(401, { "Content-Type": "application/json" },
                    '[{ "id": 12, "comment": "Hey there" }]');

                expect(errorCallback.calledOnce).toBeTruthy();
                expect(testCallback.calledOnce).toBe(false);
            });
        });

        describe('when saving solution configuration settings', function() {
            var errorCallback;
            var mockSolutionCollection;
            var testCallback ;
            beforeEach(function () {
                errorCallback = sinon.spy();
                mockSolutionCollection = {};
                mockSolutionCollection.fetch = sinon.spy();
                mockSession.isActive =  sinon.stub().returns(true);
                solutionsController = new SolutionsController({session: mockSession, solutionCollection: mockSolutionCollection});
                solutionsController.on("error", errorCallback);
                testCallback = sinon.spy();
            });

            afterEach(function () {
                solutionsController.off("error", errorCallback);
                errorCallback = null;
            });

            it('should call error', function () {
                solutionsController = new SolutionsController({session: mockSession});
                solutionsController.on("error", errorCallback);
                this.xhr = sinon.useFakeXMLHttpRequest();
                var requests = this.requests = [];

                this.xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };

                var testCallback = sinon.spy();

                solutionsController.saveSolutionConfigSettings({attributes: {name: "test"}},{},testCallback);

                //this "responds" to the request so the appropriate callback can be called
                requests[0].respond(401, { "Content-Type": "application/json" },
                    '[{ "id": 12, "comment": "Danger Will Robinson Danger" }]');

                expect(errorCallback.calledOnce).toBeTruthy();
                expect(testCallback.calledOnce).toBe(false);
            });
        });

        describe('select Solution', function () {
            var mockSolutionCollection;
            var testSolution = {};
            beforeEach(function () {
                mockLocation = {
                    navigate: sinon.spy()
                };
                mockSession = {
                    isActive: sinon.stub().returns(false)
                };
                Core.Events.enableFor(mockSession);
                mockSolutionCollection = {};

                mockSolutionCollection.get = sinon.stub().returns(testSolution);
                Core.Events.enableFor(mockSolutionCollection);

                sinon.spy(mockSolutionCollection, "once");
            });

            it('binds to sync and returns when collection has no items', function () {
                mockSolutionCollection.length = 0;

                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});


                var result = solutionsController.selectSolution(1);
                mockSolutionCollection.trigger("sync");
                expect(mockSolutionCollection.once).toBeTruthy();

            });

            it('returns solution when collection has items', function () {
                mockSolutionCollection.length = 1;
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                var result = solutionsController.selectSolution(1);

                expect(result).toBe(testSolution);
            });
        });

        describe('remove solutions', function () {
            var mockSolutionCollection;
            beforeEach(function () {
                mockLocation = {
                    navigate: sinon.spy()
                };
                mockSession = {
                    isActive: sinon.stub().returns(false)
                };
                Core.Events.enableFor(mockSession);
                mockSolutionCollection = {};
                Core.Events.enableFor(mockSolutionCollection);

            });

            it('should call func when collection removes solution', function () {
                var testCallback = sinon.spy();
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                solutionsController.requestNotificationOnRemove(testCallback)
                mockSolutionCollection.trigger('remove', {});
                expect(testCallback.calledOnce).toBeTruthy();
            });

            it('should remove solution based on given model', function () {
                var destroy = function(options) {options.success()};
                destroy = sinon.spy(destroy);
                mockSolutionCollection.models = [{attributes: {name:"Test"}, destroy: destroy},{attributes: {name:"Test2"}, destroy: destroy}];
                var destroySuccess = sinon.spy();
                var destroyFailure = sinon.spy();

                var mockModel = {name: "Test"};


                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                solutionsController.deleteSolution(mockModel, {success: destroySuccess, error: destroyFailure});
                expect(destroySuccess.calledOnce).toBeTruthy();
            });

            it('should call success if successful', function () {
                var destroy = function(options) {options.success()};
                destroy = sinon.spy(destroy);
                mockSolutionCollection.models = [{attributes: {name:"Test"}, destroy: destroy},{attributes: {name:"Test2"}, destroy: destroy}];
                var destroySuccess = sinon.spy();

                var mockModel = {name: "Test"};
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                solutionsController.deleteSolution(mockModel, {success: destroySuccess});
                expect(destroySuccess.calledOnce).toBeTruthy();
            });

            it('should call error if failed', function () {
                var destroy = function(options) {options.error()};
                destroy = sinon.spy(destroy);
                mockSolutionCollection.models = [{attributes: {name:"Test"}, destroy: destroy},{attributes: {name:"Test2"}, destroy: destroy}];
                var destroyFailure = sinon.spy();

                var mockModel = {name: "Test"};

                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                solutionsController.deleteSolution(mockModel, {error: destroyFailure});
                expect(destroyFailure.calledOnce).toBeTruthy();
            });
        });

        describe('remove all solutions', function () {
            var mockSolutionCollection;
            beforeEach(function () {
                mockLocation = {
                    navigate: sinon.spy()
                };
                mockSession = {
                    isActive: sinon.stub().returns(false)
                };
                Core.Events.enableFor(mockSession);
                mockSolutionCollection = {};
                mockSolutionCollection.first = function() {
                    return mockSolutionCollection.models[0];
                }
                Core.Events.enableFor(mockSolutionCollection);

            });

            it('should call success if successful', function () {

                var destroy = function(options) {
                    mockSolutionCollection.models.splice(0,1);
                    options.success()
                };
                destroy = sinon.spy(destroy);

                mockSolutionCollection.models = [{attributes: {name:"Test"}, destroy: destroy},{attributes: {name:"Test2"}, destroy: destroy}];

                var destroySuccess = sinon.spy();
                var destroyFailure = sinon.spy();

                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                solutionsController.deleteAllSolutions({success: destroySuccess, error: destroyFailure});
                expect(destroySuccess.callCount).toBe(2);

            });

            it('should call error if failed', function () {

                var destroy = function(options) {
                    mockSolutionCollection.models.splice(0,1);
                    options.error()
                };
                destroy = sinon.spy(destroy);

                mockSolutionCollection.models = [{attributes: {name:"Test"}, destroy: destroy},{attributes: {name:"Test2"}, destroy: destroy}];

                var destroySuccess = sinon.spy();
                var destroyFailure = sinon.spy();

                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                solutionsController.deleteAllSolutions({success: destroySuccess, error: destroyFailure});
                expect(destroyFailure.callCount).toBe(2);
            });
        });

        describe('can notify on fetch of Solution', function () {
            var mockSolutionCollection;
            beforeEach(function () {
                mockLocation = {
                    navigate: sinon.spy()
                };
                mockSession = {
                    isActive: sinon.stub().returns(false)
                };
                Core.Events.enableFor(mockSession);
                mockSolutionCollection = {};
                Core.Events.enableFor(mockSolutionCollection);

            });

            it('should call func when collection fetchs', function () {
                mockSolutionCollection.length = 1;
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                var testCallback = sinon.spy();
                solutionsController.requestNotificationOnFetch(testCallback, this);
                mockSolutionCollection.trigger('sync', {});
                expect(testCallback.calledOnce).toBeTruthy();
            });
        });

        describe('can get solution row data for list', function () {
            var mockSolutionCollection;
            beforeEach(function () {
                mockLocation = {
                    navigate: sinon.spy()
                };
                mockSession = {
                    isActive: sinon.stub().returns(false)
                };
                Core.Events.enableFor(mockSession);
                mockSolutionCollection = {};

            });

            it('returns empty when collection has no items', function () {
                mockSolutionCollection.length = 0;
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                expect(solutionsController.getSolutionRows().length).toBe(0);
            });

            it('returns rows when collection has items', function () {
                mockSolutionCollection.length = 1;
                mockSolutionCollection.models = [];
                mockSolutionCollection.models[0] = {attributes: {name: "testSolution"}};
                solutionsController = new SolutionsController({solutionCollection: mockSolutionCollection});
                var result = solutionsController.getSolutionRows();
                expect(result[0].name).toBe("testSolution");
            });
        });
    });
});