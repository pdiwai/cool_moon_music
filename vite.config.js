import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  mode: "development",
  server: {
    port: 6060, //端口号
    host: true, //ip地址 或 '0.0.0.0' 或 "loaclhost"
    open: false, //启动后是否自动打开浏览器
    cors: true,
    fs: {
      strict: true,
    },
    proxy: {
      "/api": {
        secure: false,
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [vue()],
});
