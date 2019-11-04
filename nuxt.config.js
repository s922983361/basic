require('dotenv').config()

module.exports = {
	mode: 'universal',
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000'
	},
	
	router: {
		middleware: []
	},
	/*
	** Headers of the page
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700' },
			{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css' },
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
		// '@/assets/css/tailwind.css',
		//'element-ui/lib/theme-chalk/index.css',
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{ src: '@/plugins/axios.js', ssr: true },
		{ src: '@/plugins/element-ui', ssr: true },
		{ src: '@/plugins/eventBus.js', ssr: false },
		{ src: '@/plugins/tools.js', ssr: false },
		{ src: '@/plugins/lodash.js', ssr: false },
		{ src: '@/plugins/vueHtmlToPaper.js', ssr: false },
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/tailwindcss'
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		'@nuxtjs/dotenv',
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		prefix: '/api',
		retry: { retries: 3 },
	},
	/*
	** pwa configuration
	** pwa modules include
	** 1. Workbox - Registers a service worker for offline caching
	** 2. Manifest - Automatically generate manifest.json file.
	** 3. Meta - Automatically adds SEO friendly meta data with manifest integration
	** 4. Icon - Automatically generates app icons with different sizes.
	*/	
	
	icons: {
		/* icon options--https://pwa.nuxtjs.org/modules/icon.html#options */
	},
	manifest: {
		"name": "pwa-test",
		"short_name": "blog-pwa",
		"start_url": "/",
		"display": "standalone",
		"background_color": "#000000",
		"theme_color": "#4DBA87"
	},
	/* workbox options https://github.com/nuxt-community/pwa-module/blob/dev/lib/workbox/defaults.js*/
	workbox: {
		runtimeCaching: [
			{
				// Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
				urlPattern: 'localhost:3000/.*',
				// Defaults to `networkFirst` if omitted
				handler: 'networkFirst',
				// Defaults to `GET` if omitted
				method: 'GET'
			}
		]
	},
	/*
    ** purgeCSS configuration options
    ** See https://github.com/Developmint/nuxt-purgecss#options
    */
	purgeCSS: {
		//保留elment-ui的樣式
		whitelistPatternsChildren: [/^el-/],
		//刪除沒用到的animate.css
		keyframes: true
	},

	/*
	** Build configuration
	*/
	build: {
		analyza: { // 啟動分析 npm run build --analyze
			analyzeMode: 'static'
		},
		transpile: [/^element-ui/],

		extractCSS: true,//提取css		
		babel: {
			plugins: [ //babel-plugin-component 優化 element-ui
				["component",
					{
						"libraryName": "element-ui",
						"styleLibraryName": "theme-chalk"
					}
				]
			]
		},
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
			config.node = {
				fs: 'empty'
			}
		}
	}
}
