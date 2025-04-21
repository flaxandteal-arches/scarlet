import ko from 'knockout';
import { generateArchesURL } from "@/arches/utils/generate-arches-url.ts";
import initWorkflowTemplate from 'templates/views/components/plugins/init-workflow.htm';

var InitWorkflow = function(params) {
    this.workflows = params.workflows.map(function(wf){
        wf.url = generateArchesURL("plugins", {slug: wf.slug});
        return wf;
    }, this);
};

export default ko.components.register('init-workflow', {
    viewModel: InitWorkflow,
    template: initWorkflowTemplate
});
