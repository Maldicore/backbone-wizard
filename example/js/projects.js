/**
 * View logic for Projects
 */

/**
 * application logic specific to the Project listing page
 */
var page = {

	projects: new model.ProjectCollection(),
	collectionView: null,
	project: null,
	modelView: null,
	wizardView: null,
	isInitialized: false,

	// Wizard Related Sub Views
	pinfoView: false,
	pdatesView: false,
	ppriorityView: false,
	confirmView: false,

	fetchParams: { filter: '', orderBy: '', orderDesc: '', page: 1 },
	fetchInProgress: false,
	dialogIsOpen: false,
	wizardIsOpen: false,

	/**
	 *
	 */
	init: function()
	{

		if (!$.isReady && console) console.warn('page was initialized before dom is ready.  views may not render properly.');

		$("#addProjectButton").click(function(e) {
			e.preventDefault();
			page.showWizard();
		});

		// let the page know when the dialog is open
		$('#projectAddDialog').on('show',function(){
			page.wizardIsOpen = true;
		});

		// when the model dialog is closed, let page know and reset the model view
		$('#projectAddDialog').on('hidden',function(){
			$('#modelAlert').html('');
			page.wizardIsOpen = false;
		});

		// initialize the collection view
		this.collectionView = new view.CollectionView({
			el: $("#projectCollectionContainer"),
			templateEl: $("#projectCollectionTemplate"),
			collection: page.projects
		});

		// TODO: initialize the wizard view

		// initialize the search filter
		$('#filter').change(function(obj){
			page.fetchParams.filter = $('#filter').val();
			page.fetchParams.page = 1;
			page.fetchProjects(page.fetchParams);
		});

		// make the rows clickable ('rendered' is a custom event, not a standard backbone event)
		this.collectionView.on('rendered',function(){

			// make the headers clickable for sorting
			$('table.collection thead tr th.clickable').click(function(e) {
				e.preventDefault();
				var prop = this.id.replace('header_','');
				// toggle the ascending/descending before we change the sort prop
				page.fetchParams.orderDesc = (prop == page.fetchParams.orderBy && !page.fetchParams.orderDesc) ? '1' : '';
				page.fetchParams.orderBy = prop;
				page.fetchParams.page = 1;
				page.fetchProjects(page.fetchParams);
			});

			// attach click handlers to the pagination controls
			$('.pageButton').click(function(e) {
				e.preventDefault();
				page.fetchParams.page = this.id.substr(5);
				page.fetchProjects(page.fetchParams);
			});

			page.isInitialized = true;
		});

		// backbone docs recommend bootstrapping data on initial page load, but we live by our own rules!
		this.fetchProjects({ page: 1 });

		// initialize the model view
		this.modelView = new view.ModelView({
			el: $("#projectModelContainer")
		});

		// tell the model view where it's template is located
		this.modelView.templateEl = $("#projectModelTemplate");

		if (model.longPollDuration > 0)
		{
			setInterval(function () {

				if (!page.dialogIsOpen)
				{
					page.fetchProjects(page.fetchParams,true);
				}

			}, model.longPollDuration);
		}
	},

	/**
	 * Fetch the collection data from the server
	 * @param object params passed through to collection.fetch
	 * @param bool true to hide the loading animation
	 */
	fetchProjects: function(params, hideLoader)
	{
		// persist the params so that paging/sorting/filtering will play together nicely
		page.fetchParams = params;

		if (page.fetchInProgress)
		{
			if (console) console.log('supressing fetch because it is already in progress');
		}

		page.fetchInProgress = true;

		if (!hideLoader) app.showProgress('loader');

		page.projects.fetch({

			data: params,

			success: function() {

				if (page.projects.collectionHasChanged)
				{
					// data returned from the server.  render the collection view
					page.collectionView.render();
				}

				app.hideProgress('loader');
				page.fetchInProgress = false;
			},

			error: function(m, r) {
				app.appendAlert(app.getErrorMessage(r), 'alert-error',0,'collectionAlert');
				app.hideProgress('loader');
				page.fetchInProgress = false;
			}

		});
	},

	/**
	 * Show the Add Project Wizard and initialize it
	 */
	showWizard: function()
	{
		// 'use strict';
		// show the modal dialog
		$('#projectAddDialog').modal({ show: true });
		var wpmodel = '';
		// project Model
		if(page.wizardView)
		{
			wpmodel = page.wizardView.model;
		}
		else
		{
			wpmodel = new model.ProjectModel();
		}

		// initialize the model view
		// tell the model view where it's template is located
		page.wizardView = new wView.WizardView({
			model:wpmodel
		});

		page.pinfoView = new wView.NameView(
			{
				model:wpmodel,
				tEl:"#pinfo-template",
				tName:["name","description"]
			});
		page.pinfoView.specialUpdate = function(){};

		page.plocationView = new wView.NameView(
			{
				model:wpmodel,
				tEl:"#plocation-template",
				tName:["island",'district']
			});

		page.plocationView.specialUpdate = function(){
			var districts = {
				'Male': ['Henveiru', 'Maafannu', 'Galolhu', 'Machangolhi', 'Villigili','Hulhumale'],
				'Fuvahmulah': ['Dhadimagu', 'Dhiguvaandu', 'Hoadhadu', 'Maadhadu','Maalegan','Miskiymagu','Funaadu','Dhiindigan']
			};

			//The form
			var locationForm = new Backbone.Form({
				schema: {
					island: { type: 'Select', options: ['Male', 'Fuvahmulah'] },
					district: { type: 'Select', options: districts.Male }
				}
			}).render();

			locationForm.on('island:change', function(form, islandEditor) {
				var island = islandEditor.getValue(),
				newOptions = districts[island];

				form.fields.district.editor.setOptions(newOptions);
			});

			$('#locationForm').append(locationForm.el);

		};

		page.pdatesView = new wView.NameView(
			{
				model:wpmodel,
				tEl:"#pdates-template",
				tName:["startDate","endDateT","endDateF","actualStartDate","authorisedDate","planningCompletedDate"]
			});

		page.pdatesView.specialUpdate = function(){
			// initialize date-picker for date selection
			try {
				$('.date-picker').datepicker().on('changeDate', function(ev){
					$('.date-picker').datepicker('hide');
				});
			} catch (error) {
				// this happens if the datepicker input.value isn't a valid date
				if (console) console.log('datepicker error: '+error.message);
			}
		};

		page.ppriorityView = new wView.NameView(
			{
				model:wpmodel,
				tEl:"#ppriority-template",
				tName:["priorityId"]
			});
		page.ppriorityView.specialUpdate = function(){};

		page.confirmView = new wView.NameView(
			{
				model:wpmodel,
				tEl:"#confirm-template",
				tName:["confirm"],
				extraModels:[]
			});
		page.confirmView.specialUpdate = function(){};
		page.confirmView.saveData = function(data){

			var o = JSON.parse(data);
			// console.log(o);
			// console.log(o.name);
			wpmodel.save({
				'name': o.name,
				'description': o.description,
				'startDate': o.startDate,
				'endDateT': o.endDateT,
				'endDateF': o.endDateF,
				'priorityId': o.priorityId,
				'authorisedDate': o.authorisedDate,
				'statusId': '1'
				}, {
				wait: true,
				success: function(){
					$('#projectAddDialog').modal('hide');
					setTimeout("app.appendAlert('Project was sucessfully inserted','alert-success',3000,'collectionAlert')",500);
					app.hideProgress('modelLoader');

					// add new data to the collection now
					page.projects.add(wpmodel);
					// console.log(wpmodel.attributes.id);
				},
				error: function(model,response,scope){

					app.hideProgress('modelLoader');

					app.appendAlert(app.getErrorMessage(response), 'alert-error',0,'modelAlert');

					try {
						var json = $.parseJSON(response.responseText);

						if (json.errors)
						{
							$.each(json.errors, function(key, value) {
								$('#'+key+'W').addClass('error');
								$('#'+key+'W span.help-inline').html(value);
								$('#'+key+'W span.help-inline').show();
							});
						}
					} catch (e2) {
						if (console) console.log('error parsing server response: '+e2.message);
					}
				}
			});
		};

		page.wizardView.insertView({ref:page.pinfoView,tab:'Details'});
		page.wizardView.insertView({ref:page.pdatesView,tab:'Dates'});
		page.wizardView.insertView({ref:page.ppriorityView,tab:'Priority'});
		page.wizardView.insertView({ref:page.plocationView,tab:'Location'});
		page.wizardView.insertView({ref:page.confirmView,tab:'Confirm'});
		// page.wizardView.render().el;
		$('#wizard-container').html(page.wizardView.render().el);
	}

};