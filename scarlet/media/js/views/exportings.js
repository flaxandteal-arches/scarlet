import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import exportingsReportTemplate from 'templates/views/exportings.htm';
export default ko.components.register('views/exportings', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Made",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Exported By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Exported To"
                )
            },
            {
                title: "Received",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Exported To", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Exported By"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Exporting", groups);
    },
    template: exportingsReportTemplate
});
