<template>
  <div style="height: 400px">
    <VueBpmnViewer :xml="xml" :flow="flow" />
  </div>
</template>
<script setup lang="ts">
import VueBpmnViewer from "/package/vue-bpmn-viewer/index";
import {xml , flow} from './data'
</script>
<style scoped></style>
