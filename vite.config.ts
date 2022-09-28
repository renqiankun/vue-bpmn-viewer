import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "package/vue-bpmn-viewer/index.ts"),
      name: "VueBpmnViewer",
      fileName: "vue-bpmn-viewer",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [
        "vue",
        "inherits",
        "bpmn-js/lib/Viewer",
        "diagram-js/lib/navigation/zoomscroll",
        "diagram-js/lib/navigation/movecanvas",
      ],
      output: {
        globals: {
          vue: "Vue",
          inherits: "inherits",
          "bpmn-js/lib/Viewer": "Viewer",
          "diagram-js/lib/navigation/zoomscroll": "ZoomScrollModule",
          "diagram-js/lib/navigation/movecanvas": "MoveCanvasModule",
        },
      },
    },
  },
});
