import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import workExhibitedReportTemplate from 'templates/views/work-exhibited.htm';
export default ko.components.register('views/work-exhibited', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Exhibition",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Exhibited Work By", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Exhibition Name"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Exhibition", groups);
    },
    template: workExhibitedReportTemplate
});
