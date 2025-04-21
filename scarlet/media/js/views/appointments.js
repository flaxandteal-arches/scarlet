define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    'utils/report',
    'templates/views/appointments.htm',
    'bindings/datatable',
    'views/business-appointments',
    'views/royal-appointments',
], function(_, ko, $, arches, reportUtils, appointmentsReportTemplate) {
    return ko.components.register('views/appointments', {
        viewModel: function(params) {
            const self = this;
            self.resource = params.data;
            self.resourceId = params.resourceId;
            self.report = params.report;
            self.reportSpecification = self.report().reportSpecification;
            self.showUnordered = ko.observable(false);

            Object.assign(self, reportUtils);

            self.cards = Object.assign({}, params.cards);
            self.edit = params.editTile || self.editTile;
            self.delete = params.deleteTile || self.deleteTile;
            self.add = params.addTile || self.addNewTile;

        },
        template: appointmentsReportTemplate
    });
});
