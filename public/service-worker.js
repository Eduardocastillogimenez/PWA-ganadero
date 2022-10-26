// Set this to true for production
// Name our cache
const CACHE_NAME = 'pwa-v1';

// Delete old caches that are not our current one!

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'main.js',
        'main.css',
        'offline'
      ]);
    })
  );
});


// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then((r) => {
        console.log('[Servicio Worker] Obteniendo recurso: '+event.request.url);
        return r || fetch(event.request).then((response) => {
              return caches.open(CACHE_NAME).then((cache) => {
        console.log('[Servicio Worker] Almacena el nuevo recurso: '+event.request.url);
        cache.put(event.request, response.clone());
        return response;
      });
    });
  })
    );
});