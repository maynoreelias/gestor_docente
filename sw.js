// CÓDIGO MEJORADO Y ACTUALIZABLE PARA sw.js
const CACHE_NAME = 'docente-apps-cache-v4'; // <-- IMPORTANTE: Cambia la versión cada vez que actualices
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  
  // Apps principales
  './apps/notas.html',
  './apps/asistencia.html',
  './apps/casos.html',
  './apps/cocina.html',
  './apps/seguimiento.html',
  './apps/taks.html',
  './apps/tools.html', // El sub-lanzador
  
  // Las 10 herramientas individuales (ajústalas a tus nombres de archivo)
  './apps/tools/selector.html',
  './apps/tools/grupos.html',
  './apps/tools/temporizador.html',
  './apps/tools/medidor_ruido.html',
  './apps/tools/dado.html',
  './apps/tools/herramienta6.html',
  './apps/tools/herramienta7.html',
  './apps/tools/herramienta8.html',
  './apps/tools/herramienta9.html',
  './apps/tools/herramienta10.html'
];

// 1. Instalación: Descarga y guarda en caché todos los archivos.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Fuerza al nuevo SW a activarse más rápido.
});

// 2. Activación: Limpia las cachés antiguas.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Toma el control de la página inmediatamente.
});

// 3. Fetch: Sirve desde la caché primero, con fallback a la red (estrategia "Cache First").
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en la caché, lo devuelve.
        if (response) {
          return response;
        }
        // Si no, lo busca en la red.
        return fetch(event.request);
      })
  );
});
