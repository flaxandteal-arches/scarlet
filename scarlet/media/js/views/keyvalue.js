import _ from 'underscore';
import ko from 'knockout';
import arches from 'arches';
import reportUtils from 'utils/report';
import keyvalueReportTemplate from 'templates/views/keyvalue.htm';
export default ko.components.register('views/keyvalue', {
    // IMPORTANT:  this scene *requires* you to compile your own data.  Aboutness is too disparate across all models.
    viewModel: function(params) {
        var self = this;
        Object.assign(self, reportUtils);
        self.cards = Object.assign({}, params.cards);
        self.edit = params.editTile || self.editTile;
        self.delete = params.deleteTile || self.deleteTile;
        self.add = params.addTile || self.addNewTile;
        self.item = ko.unwrap(params.data);
        self.tileid = params.tileid || self.item?.tileid;
        self.visible = {};
        self.inline = params.inline || false;
        self.small = params.small || false;
    },
    template: keyvalueReportTemplate
});
