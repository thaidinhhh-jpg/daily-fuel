// Offline cache for Daily Fuel. Bump VERSION when shipping changes.
const VERSION = "daily-fuel-v20";
const SHELL = ["./", "index.html", "foods.js", "fastfood.js", "recipes.js", "recipe-images.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const IMAGES = ["img/burger.webp", "img/burrito.webp", "img/cake.webp", "img/casserole.webp", "img/coffee.webp", "img/cookies.webp", "img/creamy-pasta.webp", "img/curry.webp", "img/dessert.webp", "img/drink.webp", "img/dumplings.webp", "img/eggs-toast.webp", "img/fish-chips.webp", "img/fish.webp", "img/fried-rice.webp", "img/fruit.webp", "img/grain-bowl.webp", "img/green-curry.webp", "img/kebabs.webp", "img/lasagne.webp", "img/meatballs.webp", "img/muffin.webp", "img/nachos.webp", "img/noodle-soup.webp", "img/noodles.webp", "img/pancakes.webp", "img/pasta.webp", "img/pie.webp", "img/pizza.webp", "img/porridge.webp", "img/prawns.webp", "img/risotto.webp", "img/roast-dinner.webp", "img/salad.webp", "img/sandwich.webp", "img/sausages.webp", "img/schnitzel.webp", "img/smoothie.webp", "img/snack-balls.webp", "img/soup.webp", "img/steak.webp", "img/stir-fry.webp", "img/tacos.webp", "img/toastie.webp", "img/tofu.webp", "img/veggie-bake.webp", "img/wrap.webp", "img/yoghurt-bowl.webp"];
const ZXING = "https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.concat(IMAGES))).then(() => self.skipWaiting()));
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
  // per-recipe pictures never change: cache-first, no background refresh
  if (url.origin === location.origin && url.pathname.includes("/img/r/")) {
    e.respondWith(caches.open(VERSION).then(async cache => {
      const hit = await cache.match(e.request);
      if (hit) return hit;
      const res = await fetch(e.request);
      if (res.ok) cache.put(e.request, res.clone());
      return res;
    }));
    return;
  }
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

// a tapped reminder opens (or focuses) the app
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    const c = cs.find(x => "focus" in x);
    return c ? c.focus() : clients.openWindow("./");
  }));
});
