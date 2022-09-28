import VueBpmnViewer from "./vue-bpmn-viewer.vue";

const install  = (Vue: any)=>{
    Vue.component(VueBpmnViewer.name, VueBpmnViewer);
}
VueBpmnViewer.install = install
if ((window as any).Vue) {
  (window as any).Vue.use(install);
}
export default VueBpmnViewer
