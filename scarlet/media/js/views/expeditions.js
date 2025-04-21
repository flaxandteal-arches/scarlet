import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import expeditionsReportTemplate from 'templates/views/expeditions.htm';
export default ko.components.register('views/expeditions', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Carried Out By",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Expedition Carried Out By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Expedition Name"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Expedition", groups);
    },
    template: expeditionsReportTemplate
});
