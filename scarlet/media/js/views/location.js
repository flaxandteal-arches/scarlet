import _ from 'underscore';
import ko from 'knockout';
import arches from 'arches';
import reportUtils from 'utils/report';
import locationReportTemplate from 'templates/views/location.htm';
export default ko.components.register('views/location', {
    viewModel: function (params) {
        const self = this;
        Object.assign(self, reportUtils);
        self.dataConfig = {
            location: ['location'],
            addresses: 'addresses',
            nationalGrid: 'national grid references',
            locationDescription: 'location descriptions',
            administrativeAreas: 'localities/administrative areas',
            geometry: 'location',
            namedLocations: 'named locations',
        }
        self.locations = params.locations;
        self.cards = Object.assign({}, params.cards);
        self.cardConfig = Object.assign({}, params.cards);
        self.selectedGeometry = params.selectedGeometry || ko.observable();
        self.edit = params.editTile || self.editTile;
        self.delete = params.deleteTile || self.deleteTile;
        self.add = params.addTile || self.addNewTile;
        self.visible = {
            geometryMetadata: ko.observable(false),
            geometry: ko.observable(true),
            coordinates: ko.observable(true),
            addresses: ko.observable(true),
            descriptions: ko.observable(true),
            administrativeAreas: ko.observable(true),
            nationalGrid: ko.observable(true),
            areaAssignment: ko.observable(true),
            landUse: ko.observable(true),
            namedLocations: ko.observable(true),
        }
        Object.assign(self.dataConfig, params.dataConfig || {});
        self.locationTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(6).fill(null)
        };
        self.addressTableConfig = {
            ...self.defaultTableConfig,
            "columns": [
                { "width": "15%" },
                { "width": "20%" },
                { "width": "20%" },
                { "width": "20%" },
                { "width": "15%" },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ]
        };
        self.locDescriptionsTableConfig = {
            ...self.defaultTableConfig,
            "columns": [
                { "width": "70%" },
                { "width": "20%" },
                null,
            ]
        };
        self.adminAreasTableConfig = {
            ...self.defaultTableConfig,
            "columns": [
                { "width": "50%" },
                { "width": "20%" },
                { "width": "20%" },
                null,
            ]
        };
        self.gridReferencesTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(2).fill(null)
        };
        self.areaAssignmentsTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(8).fill(null)
        };
        self.landUseTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(7).fill(null)
        };
        self.namedLocationsTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(2).fill(null)
        };
        self.coordinateData = ko.observable();
        self.geometryMetadata = {
            compilerName: ko.observable(),
            compileDate: ko.observable(),
            updateDate: ko.observable(),
            updaterName: ko.observable(),
            authorizerName: ko.observable(),
            authorizationDate: ko.observable(),
            typeOfAuthorization: ko.observable()
        };
        self.geometryScale = {
            captureScale: ko.observable(),
            coordinateSystem: ko.observable(),
            basemap: ko.observable(),
            accuracy: ko.observable()
        };
        self.geometryShape = ko.observable();
        self.geometryNotes = ko.observable();
        self.addresses = ko.observableArray();
        self.descriptions = ko.observableArray();
        // if params.compiled is set and true, the user has compiled their own data.  Use as is.
        if (params?.compiled) {
        } else {
            const locations = self.locations.reduce((agg, location) => {
                const locationNode = location.report_json;
                self.locationRoot = self.cardConfig?.location?.card
                if (!locationNode) {
                    return;
                }
                const geometryNode = self.getRawNodeValue(locationNode, self.dataConfig.geometry);
                if (geometryNode) {
                    const locationDataCoordinates = JSON.parse(geometryNode['@value'].replaceAll("'", '"'));
                    if (locationDataCoordinates && locationDataCoordinates != '--') {
                        agg.push(...locationDataCoordinates["features"]);
                    }
                }
                return agg;
            }, []);
            self.coordinateData({
                type: "FeatureCollection",
                features: locations
            });
        }
    },
    template: locationReportTemplate
});
