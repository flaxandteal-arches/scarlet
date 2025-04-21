import $ from 'jquery';
import ko from 'knockout';
import koMapping from 'knockout-mapping';
import { generateArchesURL } from "@/arches/utils/generate-arches-url.ts";
import editWorkflowTemplate from 'templates/views/components/plugins/edit-workflow.htm';

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
        this.workflowUrl(generateArchesURL("plugins", {slug: this.workflowSlug()}));
        this.workflow(this.getWorkflowData());
        this.graphId(this.workflow().graphId);
    };

    this.init();
};

export default ko.components.register('edit-workflow', {
    viewModel: editWorkflow,
    template: editWorkflowTemplate
});
