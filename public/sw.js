if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let r={};const _=e=>s(e,c),t={module:{uri:c},exports:r,require:_};a[c]=Promise.all(i.map((e=>t[e]||_(e)))).then((e=>(n(...e),r)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/22398069_web_Application_19_.eps",revision:"48bd0c8485782723eb0f10fb6bd0baa0"},{url:"/Get_Started/Get_Started.png",revision:"acd6875ea996854e07c296760b37a974"},{url:"/Get_Started/getStartedImage.svg",revision:"7c7061e178e914a66dfda3e111f33682"},{url:"/Vector.png",revision:"42b85e3557d7d2333df785f5357926aa"},{url:"/_next/app-build-manifest.json",revision:"fe5f908a726c55d491cbbcdefe8d83bb"},{url:"/_next/static/chunks/0-f73490907320ec92.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/155-4415fb7e710a470a.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/176-085f94cce8cf2f19.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/198-1426a471aa078093.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/2631e2f4-2bb1ba1353a14344.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/294-1c6079be793a2faf.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/570-a5d1fb063d8096b5.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/681-f6376d9fc32d3a80.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/691-4f81203f307c013d.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/75-6949bd5f11e41b14.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/771-9574be410b2d05d2.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/779-5bc12093a94a4809.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/796-0c8506d53c22b8fd.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/797-71a6187471683d62.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/822-64a60a92cb308e3a.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/_not-found-606221c35c8c6008.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/campaign/%5Bcampaignid%5D/page-a98d86ee848c4985.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/campaign/create/page-b1cc8598e747376e.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/campaign/page-d6e0c3f0764ec1b7.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/error-9a079bf98e363ae0.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/layout-b165eb0abd77add6.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/loader/page-53e206033ed18fbb.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/merchant/page-4f123fd1a3e9a513.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/merchant/scan-pay/page-b96f94e3d7a2e829.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/page-121626df100363be.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/recipient/campaigns/%5Bcampaignid%5D/page-2999eb8ab04dd16c.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/recipient/campaigns/page-cf9d1691f55a8809.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/recipient/confirmation/page-d84aa37e849383a6.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/recipient/page-8b72ebd47f04e8f8.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/recipient/scan-pay/page-6d78297b9475608c.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/recipient/tokens/page-e2a9c3d541a87988.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/signup/%5Bid%5D/page-8098f5752007ac0b.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/app/signup/page-6217cb9bd7319b34.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/e0ab0a23-c37b9b99b52fcdf9.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/fd9d1056-4e7663903f627100.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/main-264833b98daea380.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/main-app-361b3f58957a3008.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ff7cf8d50bec816d.js",revision:"p4hdsO0LyrF8DjZJ1aOSg"},{url:"/_next/static/css/36c1c29721e3b3a5.css",revision:"36c1c29721e3b3a5"},{url:"/_next/static/media/0c363f1ded688116-s.p.woff2",revision:"e03e98364e75779ca698734da0469cf3"},{url:"/_next/static/media/0de30c72378d3d79.p.woff2",revision:"b4dd000fcb8ea5b60c63865d9d49a001"},{url:"/_next/static/media/1a4ab8f0c53030cf-s.p.woff2",revision:"5c409487e34b8738fcdcd8a011b838ad"},{url:"/_next/static/media/3adced0e2407ea7a-s.p.woff2",revision:"2fc1197cf8fce573234a690800de8355"},{url:"/_next/static/media/430a50dd0593955c-s.p.woff2",revision:"793c44c57a90b6343a22d5cbcb4fcc66"},{url:"/_next/static/media/596d2588a9dffc8c-s.p.woff2",revision:"cafb601c4c62dcc3cc022889275d2841"},{url:"/_next/static/media/5b469faa5c489f13.p.woff2",revision:"14bf4533becaa9e2b00ae6430bceeb9b"},{url:"/_next/static/media/68a17b3f4bcd8ce7-s.p.woff2",revision:"39c808be0b10ca3a29aa58f278e8a642"},{url:"/_next/static/media/90ef01a0299272cf.p.woff2",revision:"3c26ec213b92fdc5d5120a503a4ad5a7"},{url:"/_next/static/media/a64ec0eae44cfe55-s.p.woff2",revision:"68c5a93f38f4c49ada1207ac8d0b55ed"},{url:"/_next/static/media/aab23ec6351d3577.p.woff2",revision:"2edd0ea21aff77ae9d3dc1d18e2eb060"},{url:"/_next/static/media/b1cebd62690e7516.p.woff2",revision:"1546a41edd378cc57157f4b0cd1e1bfd"},{url:"/_next/static/media/b5dc58e4e8f9ed2d.p.woff2",revision:"eb3ec3a3f161aa3ee79454abbd478a1d"},{url:"/_next/static/media/b7c6dce1ff028469.p.woff2",revision:"3b71aa63a13a1a88dcc673f877f21697"},{url:"/_next/static/media/c8535d443466b72a-s.p.woff2",revision:"943d9ba8c41fcbf2b0a7a1c6319d8f93"},{url:"/_next/static/media/cbfec8a235a8471d-s.p.woff2",revision:"2e0f585754e4e20a7cde5c8ebe7ad3bd"},{url:"/_next/static/media/cdc978c5a2b5290e.p.woff2",revision:"13239d0c28af51e0874ebf81d4f8a022"},{url:"/_next/static/media/eaf0659068e984d1.p.woff2",revision:"ae42eb8d3d4247fd98e3cb30f4160763"},{url:"/_next/static/p4hdsO0LyrF8DjZJ1aOSg/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/p4hdsO0LyrF8DjZJ1aOSg/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/alert_icon.png",revision:"13888629c352f17fa028bde14d078f4d"},{url:"/avatar.webp",revision:"fe3a41a22a875c2df5eb5df4a156bbf6"},{url:"/campagin_dummy.jpg",revision:"69d7a2ca6c0053b9f3b6997c007e0aaf"},{url:"/check_icon.png",revision:"9944e94dbaac2a8ee91fcdc147944cd3"},{url:"/coin.png",revision:"d65e2be4efbea7407fc3d67ba20b9440"},{url:"/empty_campaign._2.png",revision:"153c94d6d781953e8438309d170b6b57"},{url:"/empty_campaign.png",revision:"8b3ac7a142150d072637c62e99764269"},{url:"/enterPIN.png",revision:"4be4ecffd463b568d712d9f7ea558cae"},{url:"/failed_icon.png",revision:"310bf653f92da0bec886b3c4c4372aae"},{url:"/fonts/Inter-Black.ttf",revision:"118c5868c7cc1370fcf5a1fc2f569883"},{url:"/fonts/Inter-Bold.ttf",revision:"ba74cc325d5f67d0efbeda51616352db"},{url:"/fonts/Inter-ExtraBold.ttf",revision:"72ac147c98056996b2a31e95a56d6e66"},{url:"/fonts/Inter-ExtraLight.ttf",revision:"7a177fa21fece72dfaa5639d8f1c114a"},{url:"/fonts/Inter-Light.ttf",revision:"a3fe4e0f9fdf3119c62a34b1937640dd"},{url:"/fonts/Inter-Medium.ttf",revision:"cad1054327a25f42f2447d1829596bfe"},{url:"/fonts/Inter-Regular.ttf",revision:"ea5879884a95551632e9eb1bba5b2128"},{url:"/fonts/Inter-SemiBold.ttf",revision:"465266b2b986e33ef7e395f4df87b300"},{url:"/fonts/Inter-Thin.ttf",revision:"4558ff85abeab91af24c86aab81509a7"},{url:"/generateQR.gif",revision:"4a357172f0e240940695857d1577d7c4"},{url:"/generateQR.png",revision:"334c9816443c4a8d75200e858ba285aa"},{url:"/heading_bg.png",revision:"7f450f3ae2af5d04d98c2e33c1ff8816"},{url:"/icon-192x192.png",revision:"8775df340ed565ac974bec24e5029148"},{url:"/icon-256x256.png",revision:"d532ed18ab0b57117333c6bac422dd62"},{url:"/icon-384x384.png",revision:"6d4f158ae9c1551fb2c3082710c08392"},{url:"/icon-512x512.png",revision:"afb7c252ab748da832f1ed6bae8d6f22"},{url:"/icon512_maskable.png",revision:"4f27762b4740b0b9057db3f471beef6b"},{url:"/icon512_rounded.png",revision:"e79511d888fe0c34b01ada38e05b2005"},{url:"/manifest.json",revision:"7dd3eba9b027b7004b284257b215cb99"},{url:"/recipient icons/recipient_icon-1.png",revision:"2d97b88d6a91dee98b74231433615008"},{url:"/recipient icons/recipient_icon-2.png",revision:"c425444911a739d986bdc2dc09a9a1fc"},{url:"/recipient icons/recipient_icon-3.png",revision:"8c1e1b6fa8d3f29f3b985a50df5b12a0"},{url:"/serviceWroker.js",revision:"58e6ce7b95770d46c566ee3909f3875b"},{url:"/splash_screen/apple/10.2__iPad_landscape.png",revision:"462ac928f8bd2dfa5ab6e075b6cc76d8"},{url:"/splash_screen/apple/10.2__iPad_portrait.png",revision:"3888b37600160a0484fec6b7540aa79f"},{url:"/splash_screen/apple/10.5__iPad_Air_landscape.png",revision:"b7df1c2e7a4a75fb966980c9311163eb"},{url:"/splash_screen/apple/10.5__iPad_Air_portrait.png",revision:"1749db81c22cc5bc4bdf56e3331eeabf"},{url:"/splash_screen/apple/10.9__iPad_Air_landscape.png",revision:"15f912507832a7a0b88a646435dc458a"},{url:"/splash_screen/apple/10.9__iPad_Air_portrait.png",revision:"849bac086ead816a85c3f3fb5e3dceac"},{url:"/splash_screen/apple/11__iPad_Pro__10.5__iPad_Pro_landscape.png",revision:"dd9801c70963ecee8667665663bfee62"},{url:"/splash_screen/apple/11__iPad_Pro__10.5__iPad_Pro_portrait.png",revision:"a3d42bbe5262349707a7899482e1ddfb"},{url:"/splash_screen/apple/12.9__iPad_Pro_landscape.png",revision:"3242f667395521b4f3b56c710a6f1075"},{url:"/splash_screen/apple/12.9__iPad_Pro_portrait.png",revision:"8e4fbbc9eaaf55467e5157a33e88cf00"},{url:"/splash_screen/apple/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",revision:"7090709ed523534a2510be840bb42556"},{url:"/splash_screen/apple/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",revision:"149b315cb0027aff96e3769a292e740b"},{url:"/splash_screen/apple/8.3__iPad_Mini_landscape.png",revision:"0e04ae598c8ece6dfeb5d16476d62c29"},{url:"/splash_screen/apple/8.3__iPad_Mini_portrait.png",revision:"e9535872f6906930529fb5b1ed9dad5c"},{url:"/splash_screen/apple/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",revision:"7f8af041cb714365cd8cad203d6f74cb"},{url:"/splash_screen/apple/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",revision:"366d9abfa870fa93d314b5696a763561"},{url:"/splash_screen/apple/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",revision:"61764f2f79a349b1690aacb43a6a2941"},{url:"/splash_screen/apple/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",revision:"da4fa3161804924719147819777a3f10"},{url:"/splash_screen/apple/iPhone_11__iPhone_XR_landscape.png",revision:"d9778e895b449e7202497e476d9d56b6"},{url:"/splash_screen/apple/iPhone_11__iPhone_XR_portrait.png",revision:"9550e491cbe420edf0c20c76c0e158e8"},{url:"/splash_screen/apple/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",revision:"c011b617e8b4afd78e432d61d56aaeea"},{url:"/splash_screen/apple/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",revision:"b2d51e01485353c20d13c7ce2463327c"},{url:"/splash_screen/apple/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",revision:"6d3100084ab404e24d82193fabc24384"},{url:"/splash_screen/apple/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",revision:"ac2f8d2eb5de9ada44c1c25f6ae6f10f"},{url:"/splash_screen/apple/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",revision:"9c8a64e057c7670bd360ece5c16f1248"},{url:"/splash_screen/apple/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",revision:"c8b785596a906371a8f2061d101bab77"},{url:"/splash_screen/apple/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png",revision:"abe85b19ac12461df981274280e249c8"},{url:"/splash_screen/apple/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",revision:"bec55339eb66823da6752fd879c3505e"},{url:"/splash_screen/apple/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png",revision:"4181e15bb96ae17b455da8fc7fa2ade1"},{url:"/splash_screen/apple/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",revision:"1be7ac7323ff599b499c434530ae2d21"},{url:"/splash_screen/apple/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",revision:"ea4346f1b6afd2bb12370d002843fff0"},{url:"/splash_screen/apple/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",revision:"44c995ead2c4443aad4b77a95b41d891"},{url:"/splash_screen/apple/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",revision:"baa1c61974df3ac5c134e7f137abc268"},{url:"/splash_screen/apple/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",revision:"25f60435045864100a536981d98fc0c6"},{url:"/splash_screen/apple/icon.png",revision:"a692f42e926683f60b77a647955efaae"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
