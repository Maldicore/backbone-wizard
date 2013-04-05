/**
 * backbone model definitions for Portfolios, Programs and Projects Management
 */

/**
 * Use emulated HTTP if the server doesn't support PUT/DELETE or application/json requests
 */
Backbone.emulateHTTP = false;
Backbone.emulateJSON = false;

var model = {};

/**
 * long polling duration in miliseconds.  (5000 = recommended, 0 = disabled)
 * warning: setting this to a low number will increase server load
 */
model.longPollDuration = 0;

/**
 * whether to refresh the collection immediately after a model is updated
 */
model.reloadCollectionOnModelUpdate = true;

/**
 * Project Backbone Model
 */
model.ProjectModel = Backbone.Model.extend({
	urlRoot: 'api/project',
	idAttribute: 'id',
	id: '',
	name: '',
	description: '',
	startDate: '',
	endDateT: '',
	endDateF: '',
	priorityId: '',
	authorisedDate: '',
	statusId: '',
	defaults: {
		'id': null,
		'name': '',
		'description': '',
		'startDate': new Date(),
		'endDateT': new Date(),
		'endDateF': new Date(),
		'priorityId': '',
		'authorisedDate': new Date(),
		'statusId': ''
	}
});

/**
 * Project Backbone Collection
 */
model.ProjectCollection = Backbone.Collection.extend({
	url: 'api/projects',
	model: model.ProjectModel
});