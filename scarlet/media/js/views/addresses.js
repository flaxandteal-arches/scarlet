define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    'utils/report',
    'templates/views/addresses.htm',
    'views/location',
    'bindings/datatable',
], function(_, ko, $, arches, reportUtils, addressesReportTemplate) {
    return ko.components.register('views/addresses', {
        viewModel: function(params) {
            const self = this;
            Object.assign(self, reportUtils);

            // Scientific Dates table configuration
            self.addressesTableConfig = {
                ...self.defaultTableConfig,
                paging: false,
                searching: true,
                scrollY: "250px",
                columns: [
                    {"visible": false},
                    {"orderData": 0},
                    null,
                    null
                ]
            };

            self.resource = params.data;
            self.resourceId = params.resourceId();
            self.report = params.report();
            self.reportSpecification = self.report.reportSpecification;
            self.showUnordered = ko.observable(false);
            let atAddresses = Object.values(self.report.relatedResourcesLookup()).find(x => x.name == "At Address");
            if (atAddresses?.remainingResources()) {
                console.error("THERE ARE UNREQUESTED REMAINING AT-ADDRESS RESOURCES, NOT ALREADY LOADED: they will not be displayed");
            }
            let places = Object.values(self.report.relatedResourcesLookup()).find(x => x.name == "Place");
            if (places?.remainingResources()) {
                console.error("THERE ARE UNREQUESTED REMAINING PLACE RESOURCES, NOT ALREADY LOADED: they will not be displayed");
            }
            const locations = places.
                loadedRelatedResources().
                map(place => {
                    return $.ajax({
                        url: arches.urls.api_resource_report(place.link.split("/").pop()),
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            format: 'json',
                            uncompacted: true
                        }
                    }).
                        then(data => {
                            return data;
                        });
                });
            self.locations = ko.observableArray([]);
            Promise.all(locations).then(locations => {
                self.locations(locations);
            });

            const flattenAddress = function(name, address, atAddress) {
                const flattened = {};
                if (address) {
                    Object.assign(flattened, address.report_json);
                }
                if (atAddress) {
                    Object.assign(flattened, atAddress.report_json);
                }
                const addNode = function(node) {
                    Object.entries(node)
                        .filter(item => (!item[0].startsWith("@") && typeof item[1] == "object" && item[1]["@node_id"]))
                        .forEach(subnode => {
                            flattened["\t" + subnode[0]] = subnode[1];
                            addNode(subnode[1]);
                        });
                };
                Object.values(flattened).forEach(addNode);
                const ordered = Object.entries(flattened)
                    .map(item => ({
                        key: item[0],
                        value: (item[1]["@value"] !== "NON_DATA_COLLECTING_NODE") ? item[1]["@value"] : "",
                        _order: self.reportSpecification.indexOf(item[1]["@node_id"])
                    }))
                    .filter(item => self.showUnordered() || item._order >= 0)
                    .sort((i1, i2) => (i1._order - i2._order));
                return {
                    name: name,
                    visible: ko.observable(false),
                    fields: ko.observableArray(ordered)
                };
            };
            let addresses = atAddresses?.
                loadedRelatedResources()?.
                map(atAddress => {
                    return $.ajax({
                        url: arches.urls.api_resource_report(atAddress.link.split("/").pop()),
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            format: 'json',
                            uncompacted: true
                        }
                    }).
                        then(data => {
                            const occupiedAddress = data.tiles.find(t => t.tileid === data.report_json["Occupied Address"]["@tile_id"]);
                            if (occupiedAddress && occupiedAddress.data[data.report_json["Occupied Address"]["@node_id"]].length) {
                                const addressId = occupiedAddress.data[data.report_json["Occupied Address"]["@node_id"]][0].resourceId;
                                return Promise.all([
                                    Promise.resolve(data.report_json["Occupied Address"]["@value"]),
                                    $.ajax({
                                        url: arches.urls.api_resource_report(addressId),
                                        type: 'GET',
                                        dataType: 'json',
                                        data: {
                                            format: 'json',
                                            uncompacted: true
                                        }
                                    }).
                                        fail(function(response) {
                                            console.log('Getting addresses failed: \n', response);
                                        }),
                                    Promise.resolve(data)
                                ]);
                            } else {
                                return Promise.resolve([data.report_json["Occupied Address"]["@value"], undefined, data]);
                            }
                        }).
                        then(address => flattenAddress(...address)).
                        fail(function(response) {
                            console.log('Getting at-addresses failed: \n', response);
                        });
                });
            if (addresses) {
                Promise.all(addresses).then(addresses => {
                    self.addresses(addresses);
                });
            }

            self.cards = Object.assign({}, params.cards);
            self.edit = params.editTile || self.editTile;
            self.delete = params.deleteTile || self.deleteTile;
            self.add = params.addTile || self.addNewTile;
            self.addresses = ko.observableArray();
            self.visible = {
                addresses: ko.observable(true),
            };
        },
        template: addressesReportTemplate
    });
});
