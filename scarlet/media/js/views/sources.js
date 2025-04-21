import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base';
import sourcesReportTemplate from 'templates/views/sources.htm';
export default ko.components.register('views/sources', {
    viewModel: function(params) {
        var self = this;
        this.tableConfig = {
            ...this.defaultTableConfig,
            paging: false,
            searching: true,
            scrollY: "250px",
            autoWidth: false,
            columns: [
                {"visible": false, "width": "0%"},
                {"orderData": 0, "width": "30%"},
                {"width": "70%"},
                null
            ]
        };
        // FIXME: this should go from Documented In node, not RR
        const groups = [
            {
                title: "Sources",
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: () => true,
                label: data => this.labelFirstDefined(
                    data
                )
            }
        ];
        let researchNote = 'No research note added for resource';
        if(params.data() && params.data()['research note'] && params.data()['research note']['@display_value']){
            researchNote = params.data()['research note']['@display_value'];
        }
        self.researchNote = ko.observable(
            researchNote
        );
        BasePersonReport.apply(this, [params, groups]);
        this.showUnordered(true);
        this.fetchRelated("Source", groups);
    },
    template: sourcesReportTemplate
});
