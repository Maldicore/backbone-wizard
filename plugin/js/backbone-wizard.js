/* backbone-wizard.js v0.1
// (c) 2013 Yusuf Abdulla Shunan, Maldicore Group Pvt Ltd
// Backbone-wizard is freely distributable under the MIT license.
// For all details and documentation:
// http://maldicore.com/backbone-wizard
*/
wApp = {

	WizardViews: function () {

		var Node = function (wView) {
			var _next = null; //reference next node
			var _previous = null; //reference previus node
			var _view = wView.ref; //referce current view
			var _tab = wView.tab;
			return {
				setPrevious: function (node) { _previous = node; return this; }, //chainable!
				getPrevious: function () { return _previous; },
				setNext: function (node) { _next = node; return this; }, //chainable!
				getNext: function () { return _next; },
				getView: function () { return _view; },
				getTab: function () { return _tab; }
			};
		};

		var _head = null;
		var _tail = null;
		var _current = null;

		return {
			first: function () { return _head; },
			last: function () { return _tail; },
			moveNext: function () {
				return (_current !== null) ? _current = _current.getNext() : null;
			}, //set current to next and return current or return null
			movePrevious: function () {
				return (_current !== null) ? _current = _current.getPrevious() : null;
			}, //set current to previous and return current or return null
			getCurrent: function () { return _current; },
			insertView: function (wView) {
				if (_tail === null) { // list is empty (implied head is null)
					_current = _tail = _head = new Node(wView);
				}
				else {//list has nodes
					_tail = _tail.setNext(new Node(wView).setPrevious(_tail)).getNext();
				}
			},
			setCurrentByTab: function (tab) {
				var node = _head;
				while (node !== null) {
					if (node.getTab() !== tab) { node = node.getNext(); }
					else { _current = node; break; }
				}
			}
		};
	}
};

var wView = {
		/**
	 * WizardView implements a wizard view for displaying an individual model
	 * as a step by step through wizard form.
	 * Note that the property templateEl must be set after instantiation
	 */
	WizardView: Backbone.View.extend({
		/** @var compiled underscore template */
		template: null,

		/** @var templateEl (required) is the element containing the underscore template code */
		templateEl: null,

		/** @var automatically update the model on every change (recommended value is false)  */
		automaticallyUpdateModel: false,

		/** @var override backbone.events - handle when the view has been changed */
		events: {
            "click .btn-previousView": "movePrevious",
            "click .btn-nextView": "moveNext",
            "click .btn-save": "save",
            "click .nav-tabs a": "moveToTab"
        },

		tagName: 'div',

		/** initialize is fired by backbone */
        initialize: function (options) {
            _.bindAll(this, 'render', 'movePrevious', 'moveNext', 'insertView', 'save', 'moveToTab');
            $(this.el).html($($("#wizard-template").html()));
            // allow the custom options to be initialized at construction
			if (options.templateEl) this.templateEl = options.templateEl;
            this.wizardViewTabs = $(this.el).find('#wizard-view-tabs');
            this.wizardViewContainer = $(this.el).find('#wizard-view-container');
            this.wizardViews = new wApp.WizardViews();
        },

        render: function () {

            var currentView = this.wizardViews.getCurrent();
            if (currentView !== null) {

                if (currentView.getNext() === null) {
                    $('.btn-nextView', this.el).hide();
                    $('.form-actions', this.el).show();
                } else {
                    $('.btn-nextView', this.el).show();
                    $('.form-actions', this.el).hide();
                }
                if (currentView.getPrevious() === null) {
                    $('.btn-previousView', this.el).hide();
                } else {
                    $('.btn-previousView', this.el).show();
                }

                //clear the active tab css class
                this.wizardViewTabs.
                    find('li').removeClass('active');

                //set the active tab for the current view
                this.wizardViewTabs.
                    find('a[title="' + currentView.getTab() + '"]').
                    parents('li:first').addClass('active');

                //show only the current view
                this.wizardViewContainer.find('.wizard-view:parent').hide();
                $(currentView.getView().render().el).show();
                currentView.getView().specialUpdate();
            }
            return this;
        },
        //set tab and insert view within parent views manager
        insertView: function (wView) {
            var tab = wView.tab;
            view.tab = wView.tab.replace(/\s/g, '-');

            this.wizardViewTabs.
                append('<li><a href="#' + wView.tab + '" title="' + wView.tab + '">' + tab + '</a></li>');

            this.wizardViewContainer.append($(wView.ref.render().el).hide());
            this.wizardViews.insertView(wView);
        },
        movePrevious: function () {
            this.updateModel();
            this.wizardViews.movePrevious();
            this.render();
            return false;
        },

        moveNext: function () {
            this.updateModel();
            this.wizardViews.moveNext();
            this.render();
			return false;
        },
        moveToTab: function (e) {
            e = e || window.event;
            var anchor = $(e.srcElement || e.target);
            this.updateModel();
            this.wizardViews.setCurrentByTab($(anchor).attr('title'));
            this.render();
                        return false;
        },
        updateModel: function () {
            this.wizardViews.getCurrent().getView().updateModel();
            //favor view update method convention to force synchronous updates
        },
        save: function () {
            this.updateModel();
            // alert(JSON.stringify(this.model.toJSON()));
            this.wizardViews.getCurrent().getView().saveData(JSON.stringify(this.model.toJSON()));
        }
	}),

	NameView: Backbone.View.extend({

		/** @var compiled underscore template */
		tName: null,

		/** @var templateEl (required) is the element containing the underscore template code */
		tEl: null,

		model: null,

		tagName:'div',

		initialize: function(options){
			// 'use strict';
			_.bindAll(this, 'render', 'updateModel');
			this.model = options.model;
			this.tEl = options.tEl;
			this.tName = options.tName;
			this.extraModels = options.extraModels;
			if(this.tEl){
				this.template =  _.template($(this.tEl).html());
			}
		},
		events:{
			"click #wizard .btn-previousView": "updateModel",
			"click #wizard .btn-nextView": "updateModel"
		},
		render: function () {
			// 'use strict';
			var extraModels = this.extraModels;
			if(this.template){
				var json = JSON.parse(JSON.stringify(this.model.toJSON()));
				if(extraModels){
					$.each(extraModels,function(index,eModelName){
						var json2 = JSON.parse(JSON.stringify(eModelName.toJSON()));
						_.extend(json,json2);
						console.log(json);
					});
				}
				$(this.el).empty();
				$(this.el).html(this.template(json));
				return this;
			}
		},
		updateModel: function(){
			// 'use strict';
			var model = this.model;
			if(this.tName){
				var tNameE = "";
				$.each(this.tName,function(index,fName){
					tNameE = "#"+fName;
					if (model.has(fName)){
						model.set(fName,$("#"+fName,this.el).val());
					}
				});
			}
		}
	})
};