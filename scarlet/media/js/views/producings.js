import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import producingsReportTemplate from 'templates/views/producings.htm';
export default ko.components.register('views/producings', {
    viewModel: function(params) {
        const groups = [
            {
                title: "As Producer",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Producer", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Produced Objects By",
                    "Produced Objects of Type(s)",
                    "Produced Objects For"
                )
            },
            {
                title: "As Designer",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Produced Objects By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Producer",
                    "Produced Objects of Type(s)",
                    "Produced Objects For"
                )
            },
            {
                title: "As Intended Recipient",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Produced Objects For", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Producer",
                    "Produced Objects By",
                    "Produced Objects of Type(s)",
                    "Produced Objects For"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Producing", groups);
    },
    template: producingsReportTemplate
});
