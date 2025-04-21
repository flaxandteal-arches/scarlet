import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import managementsReportTemplate from 'templates/views/managements.htm';
export default ko.components.register('views/managements', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Management of Organisation(s)",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Manager", this.resourceId),
                label: data => data.report_json["Managed Organisation"]["@value"]
            },
            {
                title: "Management of This Organisation",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Managed Organisation", this.resourceId),
                label: data => data.report_json["Manager"]["@value"]
            },
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Management", groups);
    },
    template: managementsReportTemplate
});
