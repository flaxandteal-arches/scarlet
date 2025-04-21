define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    'utils/report',
    'templates/views/productive-activity.htm',
    'bindings/datatable',
    'views/inventions',
    'views/patentings',
    'views/advertisings',
    'views/producings',
    'views/agentings',
    'views/sellings',
    'views/supplyings',
    'views/exportings',
    'views/importings',
], function(_, ko, $, arches, reportUtils, productiveActivityReportTemplate) {
    return ko.components.register('views/productive-activity', {
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
        template: productiveActivityReportTemplate
    });
});
