import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // আপনার Express সার্ভারটি যে পোর্টে চলছে (যদি ৩০০০ হয়)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});