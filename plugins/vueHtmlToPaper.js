/**
 * @desc vue-html-to-paper
 * npm https://www.npmjs.com/package/vue-html-to-paper
 * this plugin  use "Vue mixin" and "$htmlToPaper" for paper printing html elements. 
 */
import Vue from 'vue';
import VueHtmlToPaper   from 'vue-html-to-paper';

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css',//element-ui style CDN
        'https://unpkg.com/element-ui/lib/index.js'////element-ui component CDN
    ]
}

Vue.use(VueHtmlToPaper , options);