define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/legal-and-financial.htm',
    'views/legal-processes',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, legalAndFinancialReportTemplate) {
    return ko.components.register('views/legal-and-financial', {
        viewModel: function(params) {
            this.resource = params.data;
            this.tableConfig = {
                ...this.defaultTableConfig,
                paging: false,
                searching: true,
                autoWidth: false,
                columns: [
                    {"visible": false, "width": "0%"},
                    {"visible": false, "width": "0%"},
                    {"orderData": 0, "width": "30%"},
                    {"width": "70%"},
                ],
                rowGroup: {
                    dataSrc: 1
                }
            };
            const fields = {
                "Bankruptcy": ["Bankruptcy"],
                "Sequestration": ["Sequestration"],
                "Incarceration": ["Incarceration"],
            };
            const groups = Object.entries(fields).map(item => ({
                title: item[0],
                visible: ko.observable(true),
                related: ko.observableArray([]),
                match: data => item[1].includes(data.field),
                label: () => item[0]
            }));

            BasePersonReport.apply(this, [params, groups]);
            this.fetchNested(Object.keys(fields), groups);
            this.groupsToGroupedRows(groups);
        },
        template: legalAndFinancialReportTemplate
    });
});
