import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import dns from "dns";

// Set DNS result order to 'verbatim'
dns.setDefaultResultOrder("verbatim");

// Export Vite configuration
export default defineConfig(({ command, mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      // Uncomment this line if you want to use visualizer plugin
      // visualizer() as PluginOption
    ],
    server: {
      // Set server port from environment variable
      port: parseInt(env.PORT, 10) || 3000, // Default to 3000 if PORT is not set
    },
    resolve: {
      alias: {
        // Set up path aliases
        "@": path.resolve(__dirname, "./src/"),
        components: path.resolve(__dirname, "./src/components/"),
        styles: path.resolve(__dirname, "./src/styles/"),
        config: path.resolve(__dirname, "./src/config/"),
        pages: path.resolve(__dirname, "./src/pages/"),
      },
    },
  };
});
