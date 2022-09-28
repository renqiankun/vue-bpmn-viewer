import w from "inherits";
import d from "bpmn-js/lib/Viewer";
import M from "diagram-js/lib/navigation/zoomscroll";
import y from "diagram-js/lib/navigation/movecanvas";
import { openBlock as _, createElementBlock as g } from "vue";
function p(e) {
  d.call(this, e);
}
w(p, d);
p.prototype._modules = [].concat(d.prototype._modules, [M, y]);
const $ = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [i, r] of t)
    a[i] = r;
  return a;
}, b = {
  name: "vue-bpmn-viewer",
  data() {
    return {
      bpmnModeler: null,
      overlays: "",
      canvas: "",
      flowTypeMap: {
        comment: "\u5BA1\u6279",
        rollbackComment: "\u9A73\u56DE"
      },
      stateMap: {
        agree: "AGREE",
        reject: "REJECT",
        review: "REVIEW"
      }
    };
  },
  props: {
    xml: "",
    flow: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    repainMap() {
      var { xml: e, flow: t } = this;
      return { xml: e, flow: t };
    }
  },
  watch: {
    repainMap: {
      async handler({ xml: e, flow: t }) {
        e && (await this.$nextTick(), this.preview());
      },
      immediate: !0
    }
  },
  methods: {
    async preview() {
      var e = this.$refs.viewer;
      if (!e || !this.xml)
        return;
      this.bpmnModeler && this.bpmnModeler.destroy();
      var t = this;
      this.bpmnModeler = new p({
        container: e,
        keyboard: { bindTo: t.$el }
      });
      var a = await this.bpmnModeler.importXML(this.xml);
      if (a && a.error && a.error.length)
        return console.error(a);
      this.bpmnModeler.get("canvas").zoom("fit-viewport", "auto"), this.flow && this.flow.length > 0 && this.setMarker();
    },
    async setMarker() {
      await this.$nextTick(), this.canvas = this.bpmnModeler.get("canvas");
      var e = this.bpmnModeler.get("overlays"), t = this.bpmnModeler.get("elementRegistry"), a = {};
      this.flow.forEach((s) => {
        var l = s.activityId;
        a[l] = s;
      });
      for (var i in a) {
        var r = t.get(i);
        r && this.setMarkerHand(r, a[i], e);
      }
    },
    setMarkerHand(e, t, a) {
      var v, m, h, f;
      var i = e.id, r = (t == null ? void 0 : t.activityState) || "", s = `<div class='node-tool-tip-reset'>
                      <div>${t.assignGroupName || ""}</div>
                      $child$
                 </div>`, l = !1, n = t.activityState ? "<p></p>" : "";
      if ((v = t.assignDetailList) == null || v.forEach((o, E) => {
        o.activityState && o.activityState != this.stateMap.review && (l = !0, n += `<div> ${o.endTime || o.createTime}</div>`, n += `<div>${o.assigneeName || ""} ${o.activityStateName || ""}\uFF1A${o.comment || ""}</div>`, n += "<p></p>");
      }), !l && t.assignDetailList.length > 0 && (n += `<div> ${(h = (m = t.assignDetailList) == null ? void 0 : m[0]) == null ? void 0 : h.createTime}</div>`), s = s.replace("$child$", n), a.add(i, {
        position: {
          top: e.height + 8 + (((f = e.label) == null ? void 0 : f.height) || 0),
          left: e.width / 2
        },
        html: s
      }), r == this.stateMap.reject)
        return this.canvas.addMarker(i, "node-reject");
      if (r == this.stateMap.agree)
        return this.canvas.addMarker(i, "node-pass");
      if (r == this.stateMap.review)
        return this.canvas.addMarker(i, "node-primary");
    }
  }
}, k = {
  class: "wrap",
  ref: "viewer"
};
function x(e, t, a, i, r, s) {
  return _(), g("div", k, null, 512);
}
const c = /* @__PURE__ */ $(b, [["render", x], ["__scopeId", "data-v-779b2a4d"]]), u = (e) => {
  e.component(c.name, c);
};
c.install = u;
window.Vue && window.Vue.use(u);
export {
  c as default
};
