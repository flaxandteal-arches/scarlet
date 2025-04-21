import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import takeoversReportTemplate from 'templates/views/takeovers.htm';
export default ko.components.register('views/takeovers', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Took Over",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Taken Over By", this.resourceId),
                label: data => data.report_json["Took Over"]["@value"]
            },
            {
                title: "Takeover(s) of This Organisation",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Took Over", this.resourceId),
                label: data => data.report_json["Taken Over By"]["@value"]
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Takeover", groups);
    },
    template: takeoversReportTemplate
});
