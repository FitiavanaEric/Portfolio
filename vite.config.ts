import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En développement, les requêtes vers /backend sont redirigées vers le
// serveur PHP intégré (php -S localhost:8000 -t backend) pour tester
// le formulaire de contact en local.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/backend": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ""),
      },
    },
  },
});
