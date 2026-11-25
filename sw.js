const V='smp-v13',F=['./','index.html','manifest.json','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request,u=new URL(q.url);if(q.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith((async()=>{const c=await caches.match(q,{ignoreSearch:true});
  const n=fetch(q).then(r=>{if(r&&r.ok)caches.open(V).then(x=>x.put(u.origin+u.pathname,r.clone()));return r}).catch(()=>null);
  if(c){e.waitUntil(n);return c}return(await n)||caches.match('index.html')})())});
