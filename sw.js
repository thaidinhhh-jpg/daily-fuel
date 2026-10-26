// Offline cache for Daily Fuel. Bump VERSION when shipping changes.
const VERSION = "daily-fuel-v8";
const SHELL = ["./", "index.html", "foods.js", "fastfood.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const ZXING = "https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // food database lookups always go to the network
  if (url.hostname.endsWith("openfoodfacts.org")) return;
  if (url.origin === location.origin || e.request.url === ZXING) {
    // serve from cache straight away, refresh it in the background
    e.respondWith(caches.open(VERSION).then(async cache => {
      const hit = await cache.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request).then(res => {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
  }
});
