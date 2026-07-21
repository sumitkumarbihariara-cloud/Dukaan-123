// Minimal service worker — just needs to exist for "Add to Home Screen" to work.
// Data always comes live from Firebase, so we don't cache pages (avoids showing stale stock/udhaar numbers).
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  // Network-first passthrough — no offline cache, since this app needs live Firebase data.
  e.respondWith(fetch(e.request).catch(() => new Response('Offline — internet chalu karo', {status: 503})));
});
