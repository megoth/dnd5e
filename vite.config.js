import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // not much to save
            // if (id.includes("@fluent")) {
            //   return "vendor_fluent";
            // }
            // maybe just this failed?
            // if (
            //   id.includes("react") ||
            //   id.includes("@uidotdev/usehooks") ||
            //   id.includes("swr") ||
            //   id.includes("clsx")
            // ) {
            //   return "vendor_react";
            // }
            if (id.includes("@ldo") || id.includes("rdf-namespaces")) {
              return "vendor_solid";
            }
            return "vendor"; // all other package goes here
          }
        },
      },
    },
  },
  plugins: [react()],
  assetsInclude: ["**/*.(md|ttl)"],
});
