if(!self.define){let l,i={};const o=(o,r)=>(o=new URL(o+".js",r).href,i[o]||new Promise((i=>{if("document"in self){const l=document.createElement("script");l.src=o,l.onload=i,document.head.appendChild(l)}else l=o,importScripts(o),i()})).then((()=>{let l=i[o];if(!l)throw new Error(`Module ${o} didn’t register its module`);return l})));self.define=(r,n)=>{const e=l||("document"in self?document.currentScript.src:"")||location.href;if(i[e])return;let f={};const s=l=>o(l,e),t={module:{uri:e},exports:f,require:s};i[e]=Promise.all(r.map((l=>t[l]||s(l)))).then((l=>(n(...l),f)))}}define(["./workbox-5b385ed2"],(function(l){"use strict";l.setCacheNameDetails({prefix:"vue-losev-frontend"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/css/715.15d306e5.css",revision:null},{url:"/css/app.bed78acc.css",revision:null},{url:"/css/chunk-vendors.ee8ae858.css",revision:null},{url:"/fonts/Gilroy-Black.0b87fc8a.eot",revision:null},{url:"/fonts/Gilroy-Black.5d4e9239.ttf",revision:null},{url:"/fonts/Gilroy-Black.b673b24a.woff2",revision:null},{url:"/fonts/Gilroy-Black.fe729d33.woff",revision:null},{url:"/fonts/Gilroy-BlackItalic.57c26b3c.eot",revision:null},{url:"/fonts/Gilroy-BlackItalic.836b13d0.woff",revision:null},{url:"/fonts/Gilroy-BlackItalic.b6be7d47.ttf",revision:null},{url:"/fonts/Gilroy-BlackItalic.fd8c82c3.woff2",revision:null},{url:"/fonts/Gilroy-Bold.4a9ebf9f.ttf",revision:null},{url:"/fonts/Gilroy-Bold.72ac7da4.woff",revision:null},{url:"/fonts/Gilroy-Bold.da918b94.woff2",revision:null},{url:"/fonts/Gilroy-Bold.ffb9504c.eot",revision:null},{url:"/fonts/Gilroy-BoldItalic.20b1d2c8.woff",revision:null},{url:"/fonts/Gilroy-BoldItalic.33c60b3f.eot",revision:null},{url:"/fonts/Gilroy-BoldItalic.81e43c67.woff2",revision:null},{url:"/fonts/Gilroy-BoldItalic.a2069ecc.ttf",revision:null},{url:"/fonts/Gilroy-Extrabold.13922720.woff2",revision:null},{url:"/fonts/Gilroy-Extrabold.22d8c416.woff",revision:null},{url:"/fonts/Gilroy-Extrabold.79adfa3c.eot",revision:null},{url:"/fonts/Gilroy-Extrabold.84e78647.ttf",revision:null},{url:"/fonts/Gilroy-ExtraboldItalic.5762f489.ttf",revision:null},{url:"/fonts/Gilroy-ExtraboldItalic.81c9ecd3.woff2",revision:null},{url:"/fonts/Gilroy-ExtraboldItalic.ce5f05bb.woff",revision:null},{url:"/fonts/Gilroy-ExtraboldItalic.ea85012a.eot",revision:null},{url:"/fonts/Gilroy-Heavy.1ba50f1f.woff2",revision:null},{url:"/fonts/Gilroy-Heavy.3c9c94e0.eot",revision:null},{url:"/fonts/Gilroy-Heavy.4065dba1.woff",revision:null},{url:"/fonts/Gilroy-Heavy.ee7ffcdb.ttf",revision:null},{url:"/fonts/Gilroy-HeavyItalic.4557b6ed.woff2",revision:null},{url:"/fonts/Gilroy-HeavyItalic.af19f067.ttf",revision:null},{url:"/fonts/Gilroy-HeavyItalic.c2e7d7cb.eot",revision:null},{url:"/fonts/Gilroy-HeavyItalic.c4a55f14.woff",revision:null},{url:"/fonts/Gilroy-Light.5ad8a71f.woff",revision:null},{url:"/fonts/Gilroy-Light.63130ecb.eot",revision:null},{url:"/fonts/Gilroy-Light.839b2e9d.woff2",revision:null},{url:"/fonts/Gilroy-Light.d8109663.ttf",revision:null},{url:"/fonts/Gilroy-LightItalic.1192c5f2.ttf",revision:null},{url:"/fonts/Gilroy-LightItalic.98e10eb7.woff",revision:null},{url:"/fonts/Gilroy-LightItalic.9da737de.woff2",revision:null},{url:"/fonts/Gilroy-LightItalic.bfa6c878.eot",revision:null},{url:"/fonts/Gilroy-Medium.325b7de6.woff2",revision:null},{url:"/fonts/Gilroy-Medium.4a1a8e74.eot",revision:null},{url:"/fonts/Gilroy-Medium.6e3bb5ed.ttf",revision:null},{url:"/fonts/Gilroy-Medium.f2851256.woff",revision:null},{url:"/fonts/Gilroy-MediumItalic.5e4d9158.ttf",revision:null},{url:"/fonts/Gilroy-MediumItalic.92248984.woff",revision:null},{url:"/fonts/Gilroy-MediumItalic.b8a8d957.woff2",revision:null},{url:"/fonts/Gilroy-MediumItalic.e72ddae2.eot",revision:null},{url:"/fonts/Gilroy-Regular.1d2eb293.ttf",revision:null},{url:"/fonts/Gilroy-Regular.3fe0f5ed.woff",revision:null},{url:"/fonts/Gilroy-Regular.72a088c6.eot",revision:null},{url:"/fonts/Gilroy-Regular.bf665241.woff2",revision:null},{url:"/fonts/Gilroy-RegularItalic.08fa9255.woff2",revision:null},{url:"/fonts/Gilroy-RegularItalic.1993f55e.eot",revision:null},{url:"/fonts/Gilroy-RegularItalic.b763f3f7.woff",revision:null},{url:"/fonts/Gilroy-RegularItalic.bd885fb7.ttf",revision:null},{url:"/fonts/Gilroy-Semibold.04e2f3d6.ttf",revision:null},{url:"/fonts/Gilroy-Semibold.29bda409.eot",revision:null},{url:"/fonts/Gilroy-Semibold.2be39dd8.woff2",revision:null},{url:"/fonts/Gilroy-Semibold.b67fed32.woff",revision:null},{url:"/fonts/Gilroy-SemiboldItalic.b03bc64e.woff",revision:null},{url:"/fonts/Gilroy-SemiboldItalic.dd56de0f.ttf",revision:null},{url:"/fonts/Gilroy-SemiboldItalic.f83ce8d5.woff2",revision:null},{url:"/fonts/Gilroy-SemiboldItalic.fe2c73f6.eot",revision:null},{url:"/fonts/Gilroy-Thin.09b156e2.woff2",revision:null},{url:"/fonts/Gilroy-Thin.6d75b910.woff",revision:null},{url:"/fonts/Gilroy-Thin.6f6f115f.ttf",revision:null},{url:"/fonts/Gilroy-Thin.e3111755.eot",revision:null},{url:"/fonts/Gilroy-ThinItalic.1b04386d.ttf",revision:null},{url:"/fonts/Gilroy-ThinItalic.591750df.woff",revision:null},{url:"/fonts/Gilroy-ThinItalic.9f45cd57.woff2",revision:null},{url:"/fonts/Gilroy-ThinItalic.f340cab5.eot",revision:null},{url:"/fonts/Gilroy-UltraLight.7e7aef73.eot",revision:null},{url:"/fonts/Gilroy-UltraLight.a19ee0f0.ttf",revision:null},{url:"/fonts/Gilroy-UltraLight.bc9a749d.woff2",revision:null},{url:"/fonts/Gilroy-UltraLight.c723830a.woff",revision:null},{url:"/fonts/Gilroy-UltraLightItalic.11593745.woff",revision:null},{url:"/fonts/Gilroy-UltraLightItalic.27b8d7f5.woff2",revision:null},{url:"/fonts/Gilroy-UltraLightItalic.9bcf8f6d.ttf",revision:null},{url:"/fonts/Gilroy-UltraLightItalic.b95ece96.eot",revision:null},{url:"/img/background-main-photo.da52c820.png",revision:null},{url:"/img/beautiful-girl-standing-in-thailand.9add8cd4.png",revision:null},{url:"/img/coconut-palm-tree.07f4d0bb.png",revision:null},{url:"/img/login-background.4a70193e.jpg",revision:null},{url:"/img/logo-4-1.847ad79a.png",revision:null},{url:"/img/register-background.4fd90619.jpg",revision:null},{url:"/index.html",revision:"c295a4685f5f843768b4a05247adce1c"},{url:"/js/120.6f981308.js",revision:null},{url:"/js/148.49d6a0fd.js",revision:null},{url:"/js/315.c922ab47.js",revision:null},{url:"/js/394.81cb585b.js",revision:null},{url:"/js/443.fffb2824.js",revision:null},{url:"/js/480.665a4baa.js",revision:null},{url:"/js/514.06c2aa49.js",revision:null},{url:"/js/576.f5d5465d.js",revision:null},{url:"/js/58.2a27ffb0.js",revision:null},{url:"/js/634.d1ec14b5.js",revision:null},{url:"/js/715.ae3a4be6.js",revision:null},{url:"/js/805.90b71af4.js",revision:null},{url:"/js/app.d867f9e8.js",revision:null},{url:"/js/chunk-vendors.85d297fb.js",revision:null},{url:"/manifest.json",revision:"7f2acad0fd9307ef17f8c81d20504f95"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
