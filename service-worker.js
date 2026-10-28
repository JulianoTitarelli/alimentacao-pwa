
"use strict";

const CACHE_NAME = "alimentacao-pwa-v1";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(chaves =>
        Promise.all(
          chaves
            .filter(chave =>
              chave.startsWith("alimentacao-pwa-") &&
              chave !== CACHE_NAME
            )
            .map(chave => caches.delete(chave))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const requisicao = event.request;

  if (requisicao.method !== "GET") {
    return;
  }

  const url = new URL(requisicao.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(requisicao)
      .then(respostaEmCache => {
        if (respostaEmCache) {
          return respostaEmCache;
        }

        return fetch(requisicao).then(resposta => {
          if (
            resposta &&
            resposta.ok &&
            resposta.type === "basic"
          ) {
            const copiaResposta = resposta.clone();

            caches.open(CACHE_NAME).then(cache => {
              cache.put(requisicao, copiaResposta);
            });
          }

          return resposta;
        });
      })
  );
});
