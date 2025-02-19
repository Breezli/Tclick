import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	base: './', // 只需在此处定义一次
	plugins: [vue()],
	server: {
		port: 5173, // 仅用于开发环境
		fs: {
			allow: ['..'], // 如果需要访问上层目录的资源，可以设置此选项
		},
	},
	build: {
		outDir: 'dist',
		assetsDir: '.',
		rollupOptions: {
			input: path.resolve(__dirname, 'index.html'),
			output: {
				assetFileNames: (assetInfo) => {
					if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
						return `fonts/[name].[hash][extname]`
					}
					return `assets/[name].[hash][extname]`
				},
			},
		},
	},
})
