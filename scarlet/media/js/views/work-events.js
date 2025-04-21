import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import reportUtils from 'utils/report';
import workEventsReportTemplate from 'templates/views/work-events.htm';
export default ko.components.register('views/work-events', {
    viewModel: function(params) {
        const self = this;
        Object.assign(self, reportUtils);
        if(params.report().id !== '16fef9f0-10e5-4f4e-bc17-d0125cf54741'){
            self.showEducation = true;
        } else {
            self.showEducation = false;
        }
        self.resource = params.data;
        self.resourceId = params.resourceId;
        self.report = params.report;
        self.reportSpecification = self.report().reportSpecification;
        self.showUnordered = ko.observable(false);
        self.visible = {};
        self.cards = Object.assign({}, params.cards);
        self.edit = params.editTile || self.editTile;
        self.delete = params.deleteTile || self.deleteTile;
        self.add = params.addTile || self.addNewTile;
    },
    template: workEventsReportTemplate
});
