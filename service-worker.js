const CACHE = "slot-v4";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  // 如果你有 icons 檔，記得加進來；沒放也沒關係，iOS 會用畫面快照當圖示
  // "icons/icon-192.png",
  // "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});


