<template>
  <div class="wrap" ref="viewer"></div>
</template>
<script>
import { CustomViewer } from "./customer";
export default {
  name: "vue-bpmn-viewer",
  data() {
    return {
      bpmnModeler: null,
      overlays: "",
      canvas: "",
      flowTypeMap: {
        comment: "审批",
        rollbackComment: "驳回",
      },
      stateMap: {
        agree: "AGREE", //通过
        reject: "REJECT", //驳回
        review: "REVIEW", //审批中
      },
    };
  },
  props: {
    xml: "",
    flow: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    repainMap() {
      var { xml, flow } = this;
      return { xml, flow };
    },
  },
  watch: {
    repainMap: {
      async handler({ xml, flow }) {
        if (xml) {
          await this.$nextTick();
          this.preview();
        }
      },
      immediate: true,
    },
  },
  // mounted() {
  //   this.preview();
  // },
  methods: {
    async preview() {
      var containerEl = this.$refs.viewer;
      if (!containerEl || !this.xml) return;
      // 避免缓存，每次清一下
      this.bpmnModeler && this.bpmnModeler.destroy();
      var _this = this;
      this.bpmnModeler = new CustomViewer({
        container: containerEl,
        keyboard: { bindTo: _this.$el },
      });
      var err = await this.bpmnModeler.importXML(this.xml);
      if (err && err.error && err.error.length) {
        return console.error(err);
      }
      const canvas = this.bpmnModeler.get("canvas");
      canvas.zoom("fit-viewport", "auto");

      if (this.flow && this.flow.length > 0) {
        this.setMarker();
      }
    },
    //节点添加标注
    async setMarker() {
      await this.$nextTick();
      this.canvas = this.bpmnModeler.get("canvas");
      // this.overlays = this.bpmnModeler.get("overlays");
      var overlays = this.bpmnModeler.get("overlays");
      var elementRegistry = this.bpmnModeler.get("elementRegistry");
      //使用新的流程覆盖旧流程
      var idMap = {};
      this.flow.forEach((item) => {
        var id = item.activityId;
        idMap[id] = item;
      });
      for (var id in idMap) {
        var shape = elementRegistry.get(id);
        shape && this.setMarkerHand(shape, idMap[id], overlays);
      }
    },
    setMarkerHand(shape, attr, overlays) {
      // if (!attr.assigneeName) return;
      var elementId = shape.id; //节点id
      //   console.log(shape, attr);
      // var comments = attr.comments[0] || {}; //审批信息
      // var typeName = this.flowTypeMap[commentType]; //审批状态名称
      // var commentText = comments ? `${typeName}：${comments.message}` : "";
      var commentType = attr?.activityState || ""; //审批状态
      var html = `<div class='node-tool-tip-reset'>
                      <div>${attr.assignGroupName || ""}</div>
                      $child$
                 </div>`;
      var childHasState = false; //子列表是否存在 已经审批过的状态
      var child = attr.activityState ? "<p></p>" : "";
      attr.assignDetailList?.forEach((item, index) => {
        //不为审批中时
        if (item.activityState && item.activityState != this.stateMap.review) {
          childHasState = true;
          child += `<div> ${item.endTime || item.createTime}</div>`;
          child += `<div>${item.assigneeName || ""} ${
            item.activityStateName || ""
          }：${item.comment || ""}</div>`; //通过：意见
          child += `<p></p>`;
        }
      });
      if (!childHasState && attr.assignDetailList.length > 0) {
        child += `<div> ${attr.assignDetailList?.[0]?.createTime}</div>`;
      }
      html = html.replace("$child$", child);
      //描述信息
      overlays.add(elementId, {
        position: {
          top: shape.height + 8 + (shape.label?.height || 0),
          left: shape.width / 2,
        },
        html,
      });
      //添加节点背景色
      //驳回
      if (commentType == this.stateMap.reject) {
        return this.canvas.addMarker(elementId, "node-reject");
      }
      //通过
      if (commentType == this.stateMap.agree) {
        return this.canvas.addMarker(elementId, "node-pass");
      }
      //正在审批
      if (commentType == this.stateMap.review) {
        return this.canvas.addMarker(elementId, "node-primary");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.wrap {
  height: 100%;
  min-height: 350px;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+");
}
::v-deep(.node-tool-tip-reset) {
  line-height: 18px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);

  font-size: 13px;
  width: 120px;
  text-align: center;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  p {
    margin: 5px 0;
  }
}
::v-deep(.djs-element) {
  &:not(.djs-connection) {
    &.node-pass .djs-visual > :first-child {
      fill: #67c23a !important;
    }
    &.node-primary .djs-visual > :first-child {
      fill: #409eff !important;
    }
    &.node-reject .djs-visual > :first-child {
      fill: #f56c6c !important;
    }
  }
}
</style>
