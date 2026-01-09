import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // เพิ่มบรรทัดนี้ (เปลี่ยน 'ชื่อ-repo' ให้ตรงกับชื่อ Repository ที่คุณจะสร้างใน GitHub)
  base: '/th8-dcc-frontend-v1/', 
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})