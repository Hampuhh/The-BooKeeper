const cacheName = 'the-bookeeper-v1'; // Nombre personalizado para tu App
const appShellFiles = [
  './',              // Esto cachea la ruta principal
  './index.html',
  './osito.png',     // Tu ícono real
  './manifest.json',
  './.nojekyll'      // Importante para GitHub Pages
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          // Opcional: Esto guarda en caché nuevos recursos que se descarguen (como las fuentes de Google)
          if (e.request.url.startsWith('http')) {
             cache.put(e.request, response.clone());
          }
          return response;
        });
      });
    }).catch(() => {
      // Si no hay internet y el recurso no está en caché, no pasa nada
    })
  );
});

