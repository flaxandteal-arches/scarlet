import _ from 'underscore';
import ko from 'knockout';
import arches from 'arches';
import reportUtils from 'utils/report';
import defaultReportTemplate from 'templates/views/scenes-default.htm';
export default ko.components.register('views/scenes-default', {
    // IMPORTANT:  this scene *requires* you to compile your own data. 
    viewModel: function(params) {
        var self = this;
        Object.assign(self, reportUtils);
        self.cards = Object.assign({}, params.cards);
        self.edit = params.editTile || self.editTile;
        self.delete = params.deleteTile || self.deleteTile;
        self.add = params.addTile || self.addNewTile;
        self.data = ko.observable();
        self.data(ko.unwrap(params.data));
        self.visible = {};
        self.sections = ko.unwrap(params.data)?.sections || []
        for(const section of self.sections) {
            self.visible[section.title] = ko.observable(true);
        }
    },
    template: defaultReportTemplate
});
