import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import supplyingsReportTemplate from 'templates/views/supplyings.htm';
export default ko.components.register('views/supplyings', {
    viewModel: function(params) {
        const groups = [
            {
                title: "As Supplier",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Supplied By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Supplied To"
                )
            },
            {
                title: "As Recipient",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Supplied To", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Supplied By"
                )
            },
            {
                title: "As Producer",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Supplied Object(s) Produced By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Supplied By"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Supplying", groups);
    },
    template: supplyingsReportTemplate
});
