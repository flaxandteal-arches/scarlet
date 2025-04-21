define([
    'knockout',
    'jquery',
    'arches',
    'viewmodels/workflow',
    'templates/views/components/plugins/create-person-workflow.htm',
    'views/components/workflows/general-info-step',
    'views/components/workflows/simon-id-step',
    'views/components/workflows/final-step'
], function(ko, $, arches, Workflow, quickResourceCreateWorkflowTemplate) {
    return ko.components.register('create-person-workflow', {
        viewModel: function(params) {
            this.componentName = 'create-person-workflow';
            this.quitUrl = "/search";
            this.stepConfig = [
                {
                    title: 'Initialize person',
                    name: 'init-person',  /* unique to workflow */
                    description: 'Initiate Person',
                    required: true,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Initialize person',
                        text: 'Provide the surname for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'general-info-step',
                                    uniqueInstanceName: 'resource-surname', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'e058a9ca-ea78-11ed-bf80-114c466094e0',
                                    },
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'General information',
                    name: 'add-info-for-person',  /* unique to workflow */
                    description: 'Initiate Person',
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'General information',
                        text: 'Provide the general information for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-given-name', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd69f0f64-ea78-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-alternative-surname-name', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'ff5c79b2-f3f3-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-alternative-given-name', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'e1103a52-f3f3-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-alternative-gender', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '581e7032-f3f4-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-nationality', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '7a30d836-f3f4-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-bio-description', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '3f6eaf70-f3f4-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-working-start-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '9f79e551-f3fa-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-working-end-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '9f79e559-f3fa-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-flourishing-start-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '04659e3b-fa10-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-flourishing-end-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '04659e43-fa10-11ed-bf80-114c466094e0',
                                    },
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Add Simon Id',
                    name: 'add-simon_id',  /* unique to workflow */
                    required: false,
                    layoutSections: [
                        {
                            componentConfigs: [
                                { 
                                    componentName: 'simon-id-step',
                                    uniqueInstanceName: 'simon-id-step',
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'c4bad66a-f3f7-11ed-bf80-114c466094e0',
                                        prefilledNodes: [
                                            [
                                                'c4bad66a-f3f7-11ed-bf80-114c466094e0'
                                            ]
                                        ]
                                    }
                                }
                            ], 
                        },
                    ],
                },
                {
                    title: 'Relationships',
                    name: 'add-info-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Relationships',
                        text: 'Provide the relationships for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-parents', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'a2b54844-f3f6-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-siblings', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'bd9e458e-f3f6-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-children', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'f94cdc54-7e1f-11ee-a492-63b45ef4509d',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-aunts-uncles', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'b3a55564-f3f5-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-nieces-nephews', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '91353f0c-f3f6-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-parents-in-law', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'cf6441f6-f3f6-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-children-in-law', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '6351549a-f3f6-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-step-children', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '883932e6-7e20-11ee-a492-63b45ef4509d',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-related-to', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '50549532-7e20-11ee-a492-63b45ef4509d',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-worked-for', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'e4a53d90-f3f6-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-friends', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '25b2719a-f3f7-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-person', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '38b60806-f3f7-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-organisation', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '4c66c3fe-f3f7-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-marriage', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'fb14ac3c-992e-11ea-90df-f875a44e0e11',
                                    },
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Addresses',
                    name: 'add-addresses-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Addresses',
                        text: 'Provide the addresses for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-at-address', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '4a14ef09-231d-4600-b732-1b9ab007f5b4',
                                    },
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Life events',
                    name: 'add-life-events-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Life events',
                        text: 'Provide the life events for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-education-as-educated-person', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '3e60947c-502b-4811-8d33-7bf96874293f',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-education-as-educator', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '0231f680-1f50-4450-aaf3-1f83789ad1a2',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-bankruptcy-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'b7cf6fbd-fa0f-11ed-bf80-114c466094e0',
                                    },
                                },
                                //TODO add confidence assessments
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-sequestration-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '80b45ea5-fa12-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-incarceration', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd59128c5-fa0e-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-incarceration-start-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd59128bf-fa0e-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-incarceration-end-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd59128c7-fa0e-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-occupied-workhouse-start-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'a8d6ac9d-fa11-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-occupied-workhouse-end-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'a8d6aca5-fa11-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-retirement-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '3c3fdb13-fa13-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-death-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '22ca5601-f3f9-11ed-bf80-114c466094e0',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-burial-date', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'ed43536b-fa10-11ed-bf80-114c466094e0',
                                    },
                                },
                            ]
                        }
                    ]
                },
                {
                    title: 'Work Events',
                    name: 'add-work-events-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Work Events',
                        text: 'Provide the work events for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-apprenticeships-as-apprentice', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '873540e6-3ccc-4e66-8d70-f0415121ffa8',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-apprenticeships-as-master', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd81a5e62-779b-42a7-8c7a-9c8955e536d3',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-employment-as-employee', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'ca4082f8-a8ef-456c-87ab-68b508207754',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-employment-as-employer', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'cc691158-31fc-4079-ba97-09e94afa95e9',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-memberships', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '34a34a77-e521-4ac6-85ba-5118b3d8ae3d',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-management', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '2b14de0e-cdbe-48ee-acf5-d181a6170754',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-ownership', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '572196ba-82aa-42bd-8f5a-74723fbb5129',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-associated-takeovers', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '179c71cf-1414-4131-ba84-865b8c902936',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-legal-process', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'fbd8dd0d-b46d-4fe1-857d-53ad74bfcc4c',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-legal-process-prosecutor', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '14aacac0-3e5a-4170-a6de-29815bca3173',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-legal-process-petitioner', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '45e13851-4b79-400f-a8b0-9655c5e0aa75',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-legal-process-sued-party', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd520fa09-204b-445b-8b9d-f8086514ef28',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-legal-process-suer', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '08426512-8a56-478f-91d9-1465425b41d5',
                                    },
                                },
                            ]
                        }
                    ]
                },
                {
                    title: 'Productive Activity',
                    name: 'add-productive-activity-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Productive Activity',
                        text: 'Provide the productive activity for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-inventing', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '122d467a-c753-4fe6-aa9e-888285897ea1',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-patenting', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '39675ddd-5bb5-49ef-86a0-ed902638c9a9',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-advertising', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'bc2cb411-b880-457e-8e42-2efd3c31c7d1',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-producing', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'a5c01412-d737-4c98-ab5f-c73775c5ce44',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-producing-as-designer', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '59684836-8b83-4f88-a893-9e77f75d0c98',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-producing-as-intended-recipient', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'a6a0b453-1de7-40f4-b69f-68ec72af05d8',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-agenting', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '4d7a1a22-84ea-43b9-8e88-377cb42696c5',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-agenting-as-client', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '51105b7d-3e36-48be-9038-b0bea70b7726',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-selling', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '2495127a-25fd-45f8-9ce2-bdc8771b643c',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-selling-recipient', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '0cc081a7-342b-49a4-aeb8-6aa8c23ca5a0',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-selling-producer', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '511261e2-e1ab-4a3c-a4c7-22afc1a38b72',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-supplying', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '82db2168-1949-4c13-91dd-80d546492d73',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-supplying-recipient', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '34d0d4b9-9f23-45ae-a4a5-7fe8516acf73',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-supplying-producer', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'b4a00339-5caa-44b7-8593-b8fd66b29b20',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-exporting', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd3dc464c-bc48-4e24-8cf1-9beb8e5a1a2d',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-exporting-to', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'a95ae22d-e3ae-4416-9393-023edc2e1ada',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-importing', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '02d9ee28-34f3-40f3-a503-7865522f896b',
                                    },
                                }, 
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-importing-supplier', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'ee1aecdc-ebd3-4297-b3d3-795d945b44c0',
                                    },
                                }, 
                            ]
                        }
                    ]
                },
                {
                    title: 'Research And Recognition',
                    name: 'add-research-and-recognition-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Research And Recognition',
                        text: 'Provide the research and recognition events for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-expedition', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'cd062bc4-6331-45c7-b057-f4fe0dcdb97d',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-survey', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '1fdac74f-c8d6-4fb2-9b96-2115a1990cb9',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-chronometer-trials', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '35e4f942-0ce5-45ae-959f-f9531cea045e',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-work-exhibited', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'b86ef581-bb7b-4813-bb6a-501398c2f2be',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-awards', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'a6eba821-e359-4de9-944f-594a6a78b818',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-awards-by', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'd09a5786-b6a4-4dd7-ac76-2851638bdfd1',
                                    },
                                },
                            ]
                        }
                    ]
                },
                {
                    title: 'Appointments',
                    name: 'add-appointments-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Appointments',
                        text: 'Provide the appointments for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-business-appointments', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'edad8805-6677-42bc-8941-ad10a82e87ba',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-business-appointments-made-by', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '988c1c51-9f44-4a0b-bdba-31ba0e96237e',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-royal-appointments', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'c9811832-b8e4-4693-9a28-f3ed96588670',
                                    },
                                },
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-royal-appointments-made-by', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: '66f8c692-860b-4571-9e91-dd2db46290a0',
                                    },
                                },
                            ]
                        }
                    ]
                },
                {
                    title: 'Sources',
                    name: 'add-sources-for-person',  /* unique to workflow */
                    required: false,
                    workflowstepclass: 'create-project-project-name-step',
                    informationboxdata: {
                        heading: 'Sources',
                        text: 'Provide the sources for the person',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'resource-source', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        resourceid: "['init-person']['resource-surname'][0]['resourceid']['resourceInstanceId']",
                                        graphid: '16fef9f0-10e5-4f4e-bc17-d0125cf54741',
                                        nodegroupid: 'ffd150c6-f3f7-11ed-bf80-114c466094e0',
                                    },
                                },
                            ]
                        }
                    ]
                },
                {
                    title: 'Finish',
                    name: 'add-resource-complete',  /* unique to workflow */
                    description: 'Finish the resource creation.',
                    layoutSections: [
                        {
                            componentConfigs: [
                                { 
                                    componentName: 'final-step',
                                    uniqueInstanceName: 'create-resource-final',
                                    tilesManaged: 'none',
                                    parameters: {
                                        resourceid: "['init-person']['resource-name'][0]['resourceInstanceId']",
                                    },
                                },
                            ], 
                        },
                    ],
                }
            ];
            Workflow.apply(this, [params]);
        },
        template: quickResourceCreateWorkflowTemplate,
    });
});
