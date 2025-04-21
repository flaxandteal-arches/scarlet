define([
    'jquery',
    'knockout',
    'knockout-mapping',
    'arches',
    'templates/views/components/plugins/edit-workflow.htm'
], function($, ko, koMapping, arches, editWorkflowTemplate) {

    const editWorkflow = function(params) {
        this.WORKFLOW_LABEL = 'workflow-slug';
        this.editableWorkflows = params.editableWorkflows;
        this.selectedResource = ko.observable();
        this.workflowUrl = ko.observable();
        this.workflowSlug = ko.observable();
        this.workflow = ko.observable();
        this.graphId = ko.observable();
        this.loading = ko.observable(false);
        this.resourceName = ko.observable();

        this.getWorkflowSlug = () => {
            let searchParams = new URLSearchParams(window.location.search);
            return searchParams.get(this.WORKFLOW_LABEL);
        };

        this.getWorkflowData = () => {
            return this.editableWorkflows.find((workflow) => workflow.slug === this.workflowSlug());
        };


        this.enableSimonIdGeneration = async() => {
            localStorage.setItem('GENERATE_SIMON_ID', true);
        };

        this.disableSimonIdGeneration = async() => {
            localStorage.setItem('GENERATE_SIMON_ID', false);
        };

        this.init = async() => {
            this.workflowSlug(this.getWorkflowSlug());
            this.workflowUrl(arches.urls.plugin(this.workflowSlug()));
            this.workflow(this.getWorkflowData());
            this.graphId(this.workflow().graphId);
        };

        this.init();
    };

    return ko.components.register('edit-workflow', {
        viewModel: editWorkflow,
        template: editWorkflowTemplate
    });
});
