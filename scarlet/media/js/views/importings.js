import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import importingsReportTemplate from 'templates/views/importings.htm';
export default ko.components.register('views/importings', {
    viewModel: function(params) {
        const groups = [
            {
                title: "As Recipient",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Imported By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Imported From"
                )
            },
            {
                title: "As Supplier",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Imported From", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Imported By"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Importing", groups);
    },
    template: importingsReportTemplate
});
