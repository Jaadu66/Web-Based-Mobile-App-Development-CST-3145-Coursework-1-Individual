var cacheName = 'onlineAcademy-v1';
var cacheFiles=[
    'index.html',
    'JS/products.js',
    'JS/script.js',
    'CSS/style.css',
    'onlineacademy.manifest',
    'img'

];
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});