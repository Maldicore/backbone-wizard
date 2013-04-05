// The in-memory Store. Encapsulates logic to access Projects data.
window.store = {

    ProjectModel: {},

    populate: function () {

        this.ProjectModel[1] = {
                urlRoot: 'api/project',
                idAttribute: 'id',
                id: '1',
                name: 'Backbone Wizard',
                description: 'A backbone wizard plugin!',
                startDate: new Date('2013,12,25'),
                endDateT: new Date('2013,12,25'),
                endDateF: new Date('2014,1,1'),
                priorityId: '1',
                authorisedDate: new Date('2013,12,24'),
                statusId: '1'
        };
        this.lastId = 1;
    },

    find: function (model) {
        return this.ProjectModel[model.id];
    },

    findAll: function () {
        return _.values(this.ProjectModel);
    },

    create: function (model) {
        this.lastId++;
        model.set('id', this.lastId);
        this.ProjectModel[this.lastId] = model;
        return model;
    },

    update: function (model) {
        this.ProjectModel[model.id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.ProjectModel[model.id];
        return model;
    }

};

store.populate();

// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
Backbone.sync = function (method, model, options) {

    var resp;

    switch (method) {
        case "read":
            resp = model.id ? store.find(model) : store.findAll();
            break;
        case "create":
            resp = store.create(model);
            break;
        case "update":
            resp = store.update(model);
            break;
        case "delete":
            resp = store.destroy(model);
            break;
    }

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};