import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import inventionsReportTemplate from 'templates/views/inventions.htm';
export default ko.components.register('views/inventions', {
    viewModel: function(params) {
        const groups = [
            {
                title: "Invented",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => this.dataValueIsResource(data, "Inventor", this.resourceId),
                label: data => this.labelFirstDefined(
                    data,
                    "Invented Object Type"
                )
            }
        ];
        BasePersonReport.apply(this, [params, groups]);
        this.fetchRelated("Inventing", groups);
    },
    template: inventionsReportTemplate
});
