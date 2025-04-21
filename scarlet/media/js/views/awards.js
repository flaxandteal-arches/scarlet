import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import awardsReportTemplate from 'templates/views/awards.htm';
export default ko.components.register('views/awards', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Received",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Awarded To", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Award Name"
                )
            },
            {
                title: "Made",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Awarded By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Award Name"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Award", groups);
    },
    template: awardsReportTemplate
});
