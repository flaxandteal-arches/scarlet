define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    'utils/report',
    'templates/views/research-and-recognition.htm',
    'bindings/datatable',
    'views/expeditions',
    'views/surveys',
    'views/chronometer-trials',
    'views/work-exhibited',
    'views/awards',
], function(_, ko, $, arches, reportUtils, researchAndRecognitionReportTemplate) {
    return ko.components.register('views/research-and-recognition', {
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
        template: researchAndRecognitionReportTemplate
    });
});
