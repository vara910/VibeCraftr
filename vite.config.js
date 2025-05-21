import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"]
    }
  })],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@services": "/src/services",
      "@context": "/src/context",
    },
  },
})
