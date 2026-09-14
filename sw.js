const CACHE_NAME = 'coherence-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icone.png'
];

// Phase d'installation : le téléphone télécharge et met en mémoire les 4 fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Phase d'activation : le téléphone supprime l'ancienne version si le CACHE_NAME a changé
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception pour le mode hors-ligne : sert les fichiers depuis la mémoire
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});