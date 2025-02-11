import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	base: './', // 只需在此处定义一次
	plugins: [vue()],
	server: {
		port: 5173, // 仅用于开发环境
	},
	build: {
		outDir: 'dist',
		assetsDir: '.',
		rollupOptions: {
			input: path.resolve(__dirname, 'index.html'),
		},
	},
})
