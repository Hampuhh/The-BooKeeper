const CACHE_NAME = 'bookeeper-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/s2cphkt5/freepik-a-chubby-bear-sitting-and-reading-tiny-spectacles-98455.png'
];

// Instalar y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para devolver la versión en caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta en caché si la encuentra, si no, busca en la red
        return response || fetch(event.request);
      })
  );
});
