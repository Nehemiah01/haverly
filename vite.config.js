import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import alias from '@rollup/plugin-alias'
import path from 'path' 
// import { resolve } from 'path'

// const projectRootDir = resolve(__dirname);

// const path = require('path')
// import { ViteAliases } from 'vite-aliases'
export default defineConfig({
  plugins: [
    vue(),
    // ViteAliases()
    // alias({
    //   entries: [
    //     {
    //       find: '@',
    //       replacement: resolve(projectRootDir, 'src')
    //     }
    //   ]
    // })
  ],
  resolve: {
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	server: {
		open: '/',
    host: true
	},
})
