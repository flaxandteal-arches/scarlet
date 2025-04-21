import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import patentingsReportTemplate from 'templates/views/patentings.htm';
export default ko.components.register('views/patentings', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Patented",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Patented By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Patent Number"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Patenting", groups);
    },
    template: patentingsReportTemplate
});
