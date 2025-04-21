import $ from 'jquery';
import _ from 'underscore';
import ko from 'knockout';
import arches from 'arches';
import resourceUtils from 'utils/resource';
import reportUtils from 'utils/report';
import personReportTemplate from 'templates/views/reports/person.htm';
import reportSpecification from './REPORT-SPECIFICATION.json';
export default ko.components.register('person-report', {
    viewModel: function(params) {
        var self = this;
        params.configKeys = ['tabs', 'activeTabIndex'];
        this.configForm = params.configForm || false;
        this.configType = params.configType || 'header';
        Object.assign(self, reportUtils);
        self.sections = [
            {id: 'basic-info', title: 'Basic Information'},
            {id: 'relationships', title: 'Relationships'},
            {id: 'addresses', title: 'Addresses'},
            {id: 'work-events', title: 'Work Events'},
            {id: 'productive-activity', title: 'Productive Activity'},
            {id: 'research-and-recognition', title: 'Research and Recognition'},
            {id: 'appointments', title: 'Appointments'},
            {id: 'legal-and-financial', title: 'Legal and Financial'},
            {id: 'life-events', title: 'Life Events'},
            {id: 'sources', title: 'Sources'},
        ];
        self.reportMetadata = ko.observable(params.report?.report_json);
        params.report.reportSpecification = reportSpecification;
        self.report = ko.observable(params.report);
        self.resource = ko.observable(self.reportMetadata()?.resource);
        self.resourceId = ko.observable(self.reportMetadata()?.resourceinstanceid);
        self.displayname = ko.observable(ko.unwrap(self.reportMetadata)?.displayname);
        self.activeSection = ko.observable('basic-info');
        self.names = ko.observableArray();
        self.researchNote = ko.observable(
            self.getNodeValue(self.resource(), 'research note', '@display_value')
        );
        self.reportSpecification = ko.observable(reportSpecification);
        self.contactPointsTable = {
            ...self.defaultTableConfig,
            columns: Array(3).fill(null)
        };
        self.nameTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(3).fill(null)
        };
        // self.visible = {
        //     contactPoints: ko.observable(true),
        //     names: ko.observable(true)
        // };
        self.sourceData = ko.observable({
            sections:
                [
                    {
                        title: 'References',
                        data: [{
                            key: 'source reference work',
                            value: self.getRawNodeValue(self.resource(), 'source'),
                            type: 'resource'
                        }]
                    }
                ]
        });
        self.nameDataConfig = {
            name: undefined,
        };
        self.documentationDataConfig = {
            subjectOf: undefined
        };
        self.locationDataConfig = {
            nationalGrid: undefined,
            locationDescription: undefined,
            administrativeAreas: undefined,
            geometry: undefined
        };
        self.addressesDataConfig = {
            citation: 'bibliographic source citation'
        };
        self.resourceDataConfig = {
            files: 'digital file(s)',
            archive: undefined,
            actors: undefined
        };
        self.nameCards = {};
        self.addressesCards = {};
        self.locationCards = {};
        self.documentationCards = {};
        self.existenceCards = {};
        self.resourcesCards = {};
        self.communicationCards = {};
        self.eventCards = {};
        self.contactCards = {};
        self.imagesCards = {};
        self.relationshipsCards = {};
        self.summary = params.summary;
        self.cards = {};
        if(params.report.cards){
            const cards = params.report.cards;
            self.cards = self.createCardDictionary(cards);
            self.nameCards = {
                name: self.cards?.['name of person'],
                externalCrossReferences: self.cards?.['external cross references'],
                systemReferenceNumbers: self.cards?.['system reference numbers'],
            };
            self.addressesCards = {
                addresses: self.cards?.['addresses'],
                citation: self.cards?.['bibliographic source citation']
            };
            self.documentationCards = {
                digitalReference: self.cards?.['digital reference for person'],
            };
            self.communicationCards = {
                contactPoints: self.cards?.['contact information for person'],
            };
            self.imagesCards = {
                images: self.cards?.['images']
            };
            self.relationshipsCards = {
                relationships: self.cards?.['relationships']
            };
            self.locationCards = {
                cards: self.cards,
                location: {
                    card: null,
                    subCards: {
                        addresses: 'addresses'
                    }
                }
            };
            self.contactCards = {
                contact: self.cards?.['contact details']
            };
            self.resourcesCards = {
                activities: self.cards?.['associated activities'],
                consultations: self.cards?.['associated consultations'],
                files: self.cards?.['associated digital file(s)'],
                assets: self.cards?.['associated monuments, areas and artefacts']
            };
        }
        const nameNode = [
            "Simon ID",
            "Surname",
            "Given Name",
            "Alternative Surname",
            "Alternative Given Name",
            "Nationality",
            "Nationality Assessment",
            "SIMON Disambiguation Numeral",
            "Gender",
            "Biographical Description",
            "Parent",
            "Sibling"
        ].map(
            (field => {
                let node = self.getRawNodeValue(self.resource(), field);
                if (node) {
                    node.name = field;
                }
                return node;
            })
        ).filter(node => node); // Remove the field if not defined
        // PERHAPS REDUNDANT DUE TO HAVING REPORT-SPECIFICATION.md?
        // * SIMON Identifier: [SIMON ID c4bad66a-f3f7-11ed-bf80-114c466094e0]
        // * Surname: [Surname e058a9ca-ea78-11ed-bf80-114c466094e0]
        // * Given Name: [Given Name d69f0f64-ea78-11ed-bf80-114c466094e0]
        // * Alternative Surname: [Alternative Surname ff5c79b2-f3f3-11ed-bf80-114c466094e0]
        // * Alternative Given Name: [Alternative Given Name e1103a52-f3f3-11ed-bf80-114c466094e0]
        // * Nationality: [Nationality 7a30d836-f3f4-11ed-bf80-114c466094e0] (Nationality Assessment Note: [Nationality Assessment Note 93c630ec-f3f5-11ed-bf80-114c466094e0])
        // * SIMON Disambiguation Numeral: [SIMON Disambiguation Numeral 122e6d7a-f3f4-11ed-bf80-114c466094e0]
        // * Biographical Description: [Biographical Description 3f6eaf70-f3f4-11ed-bf80-114c466094e0]
        // * Parent(s): [Parent a2b54844-f3f6-11ed-bf80-114c466094e0]
        // * Sibling(s): [Sibling bd9e458e-f3f6-11ed-bf80-114c466094e0]
        //
        const flattenObject = function(name, objectToBeFlattened) {
            const flattened = {};
            if (objectToBeFlattened) {
                Object.assign(flattened, objectToBeFlattened);
            }
            const addNode = function(node) {
                Object.entries(node)
                    .filter(item => (!item[0].startsWith("@") && typeof item[1] == "object" && item[1]["@node_id"]))
                    .forEach(subnode => {
                        flattened[subnode[0]] = subnode[1];
                        addNode(subnode[1]);
                    });
            };
            Object.values(flattened).forEach(addNode);
            const ordered = Object.entries(flattened)
                .map(item => ({
                    key: item[0],
                    value: (item[1]["@display_value"] !== "NON_DATA_COLLECTING_NODE") ? item[1]["@display_value"] : "",
                    _order: self.reportSpecification().indexOf(item[1]["@node_id"])
                }))
                .filter(item => item._order >= 0)
                .sort((i1, i2) => (i1._order - i2._order));
            // console.log(ordered);
            return {
                name: name,
                visible: ko.observable(false),
                fields: ordered
            };
        };
        if(Array.isArray(nameNode)){
            self.names(nameNode.map(node => {
                let name = self.getNodeValue(node, '@display_value');
                let nameUseType = self.getNodeValue(node, 'name');
                const flatObject = flattenObject(nameUseType,node);
                if(flatObject.fields.length > 0){
                    name = flatObject.fields[0].value;
                    nameUseType = flatObject.fields[0].key;
                }
                // console.log(nameUseType);
                // const nameUseType = self.getNodeValue(node, 'name use type');
                // const initials = self.getNodeValue(node, 'initials', 'initial(s)');
                // const forename = self.getNodeValue(node, 'forenames', 'forename');
                // const title = self.getNodeValue(node, 'titles', 'title');
                // const surname = self.getNodeValue(node, 'surnames', 'surname');
                // const epithet = self.getNodeValue(node, 'epithets', 'epithet');
                const tileid = self.getTileId(node);
                return { name, nameUseType, tileid };
                // return { name, nameUseType, initials, forename, title, epithet, surname, tileid };
            }));
        }
        self.workEvents = [];
        let working = self.report().report_json.resource?.working;
        let flourishing = self.report().report_json.resource?.flourishing;
        let flattenedWorkingEvents = flattenObject('Working', working);
        if (flattenedWorkingEvents.fields.length > 0) {
            self.workEvents.push(flattenedWorkingEvents);
        }
        let flattenedFlourishingEvents = flattenObject('Flourishing', flourishing);
        if (flattenedFlourishingEvents.fields.length > 0) {
            self.workEvents.push(flattenedFlourishingEvents);
        }
        self.visible = {
            contactPoints: ko.observable(true),
            names: ko.observable(true),
            workEvents: ko.observable(true),
        };
        self.workEventsTableConfig = {
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
        self.lifeData = ko.observable({
            sections:
                [
                    {
                        title: 'Birth',
                        data: [{
                            key: 'Date',
                            value: self.getNodeValue(self.resource(), 'birth', 'birth time span', 'date of birth'),
                            type: 'kv',
                            card: self.cards?.birth
                        },{
                            key: 'Mother',
                            value: self.getRawNodeValue(self.resource(), 'birth', 'mother'),
                            type: 'resource',
                            card: self.cards?.birth
                        },{
                            key: 'Father',
                            value: self.getRawNodeValue(self.resource(), 'birth', 'father'),
                            type: 'resource',
                            card: self.cards?.birth
                        },{
                            key: 'Place',
                            value: self.getNodeValue(self.resource(), 'birth', 'place of birth', 'birthplace', 'birth place'),
                            type: 'kv',
                            card: self.cards?.birth
                        }]
                    },
                    {
                        title: 'Death',
                        data: [{
                            key: 'Date',
                            value: self.getNodeValue(self.resource(), 'death', 'death time span', 'date of death'),
                            type: 'kv',
                            card: self.cards?.birth
                        },{
                            key: 'Place',
                            value: self.getNodeValue(self.resource(), 'death', 'place of death', 'deathplace', 'death place'),
                            type: 'kv',
                            card: self.cards?.birth
                        }]
                    }
                ]
        });
    },
    template: personReportTemplate
});
