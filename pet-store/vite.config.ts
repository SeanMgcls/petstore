import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Use @vitejs/plugin-react for React projects

export default defineConfig({
  plugins: [react()], // Updated to use React plugin
  server: {
    proxy: {
      '/magcalas': {
        target: 'http://localhost:8080', // Java backend URL
        changeOrigin: true, 
        secure: false, // Disable SSL verification if using HTTPS in development (optional)
        rewrite: (path) => path.replace(/^\/magcalas/, ''), // Remove '/magcalas' prefix if your backend doesn't expect it
      },
    },
  },
});