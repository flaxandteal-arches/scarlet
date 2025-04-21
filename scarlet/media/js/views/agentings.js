import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import agentingsReportTemplate from 'templates/views/agentings.htm';
export default ko.components.register('views/agentings', {
    viewModel: function(params) {
        const groups = [
            {
                title: "As Agent",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Agent", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Client"
                )
            },
            {
                title: "As Client",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Client", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Agent"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Agenting", groups);
    },
    template: agentingsReportTemplate
});
