globalThis.process ??= {}; globalThis.process.env ??= {};
import { p as decodeKey } from './chunks/astro/server_29JV-YUN.mjs';
import './chunks/astro-designed-error-pages_2A6o4pfv.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_2XqmwjZg.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/admin/Documents/Private/LifeOS/","cacheDir":"file:///Users/admin/Documents/Private/LifeOS/node_modules/.astro/","outDir":"file:///Users/admin/Documents/Private/LifeOS/dist/","srcDir":"file:///Users/admin/Documents/Private/LifeOS/src/","publicDir":"file:///Users/admin/Documents/Private/LifeOS/public/","buildClientDir":"file:///Users/admin/Documents/Private/LifeOS/dist/","buildServerDir":"file:///Users/admin/Documents/Private/LifeOS/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/[...path]","isIndex":false,"type":"endpoint","pattern":"^\\/api(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"src/pages/api/[...path].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.C4TLF-oP.css"}],"routeData":{"route":"/execution/[slug]","isIndex":false,"type":"page","pattern":"^\\/execution\\/([^/]+?)\\/?$","segments":[[{"content":"execution","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/execution/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.C4TLF-oP.css"},{"type":"inline","content":".custom-scrollbar::-webkit-scrollbar{width:5px}.custom-scrollbar::-webkit-scrollbar-thumb{background:#0000001a;border-radius:10px}.prose p{margin-bottom:.5em}\n"}],"routeData":{"route":"/execution","isIndex":true,"type":"page","pattern":"^\\/execution\\/?$","segments":[[{"content":"execution","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/execution/index.astro","pathname":"/execution","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.C4TLF-oP.css"},{"type":"inline","content":".custom-scrollbar::-webkit-scrollbar{width:5px}.custom-scrollbar::-webkit-scrollbar-thumb{background:#9333ea33;border-radius:10px}.prose h1,.prose h2,.prose h3,.prose h4{color:#1e293b;font-weight:800;margin-top:1.5em;margin-bottom:.5em}.prose code{background:#f3f4f6;color:#db2777;padding:2px 4px;border-radius:4px;font-size:.9em}.prose hr{border:0;border-top:1px solid #e2e8f0;margin:2em 0}\n"}],"routeData":{"route":"/knowledge","isIndex":true,"type":"page","pattern":"^\\/knowledge\\/?$","segments":[[{"content":"knowledge","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/knowledge/index.astro","pathname":"/knowledge","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.C4TLF-oP.css"},{"type":"inline","content":".custom-scrollbar::-webkit-scrollbar{width:5px}.custom-scrollbar::-webkit-scrollbar-thumb{background:#0000001a;border-radius:10px}\n"}],"routeData":{"route":"/lifestyle","isIndex":true,"type":"page","pattern":"^\\/lifestyle\\/?$","segments":[[{"content":"lifestyle","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/lifestyle/index.astro","pathname":"/lifestyle","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.C4TLF-oP.css"},{"type":"inline","content":".custom-scrollbar::-webkit-scrollbar{width:5px}.custom-scrollbar::-webkit-scrollbar-thumb{background:#4f46e533;border-radius:10px}.prose p{margin-bottom:.5em}.prose strong{color:#312e81}\n"}],"routeData":{"route":"/vitals","isIndex":true,"type":"page","pattern":"^\\/vitals\\/?$","segments":[[{"content":"vitals","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vitals/index.astro","pathname":"/vitals","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.C4TLF-oP.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/admin/Documents/Private/LifeOS/src/pages/execution/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/execution/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/admin/Documents/Private/LifeOS/src/pages/execution/index.astro",{"propagation":"none","containsHead":true}],["/Users/admin/Documents/Private/LifeOS/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/admin/Documents/Private/LifeOS/src/pages/knowledge/index.astro",{"propagation":"none","containsHead":true}],["/Users/admin/Documents/Private/LifeOS/src/pages/lifestyle/index.astro",{"propagation":"none","containsHead":true}],["/Users/admin/Documents/Private/LifeOS/src/pages/vitals/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/[...path]@_@ts":"pages/api/_---path_.astro.mjs","\u0000@astro-page:src/pages/execution/[slug]@_@astro":"pages/execution/_slug_.astro.mjs","\u0000@astro-page:src/pages/execution/index@_@astro":"pages/execution.astro.mjs","\u0000@astro-page:src/pages/knowledge/index@_@astro":"pages/knowledge.astro.mjs","\u0000@astro-page:src/pages/lifestyle/index@_@astro":"pages/lifestyle.astro.mjs","\u0000@astro-page:src/pages/vitals/index@_@astro":"pages/vitals.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_oy9zPng6.mjs","/Users/admin/Documents/Private/LifeOS/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Users/admin/Documents/Private/LifeOS/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DARSZ1GH.mjs","/Users/admin/Documents/Private/LifeOS/.astro/content-assets.mjs":"chunks/content-assets_XqCgPAV2.mjs","/Users/admin/Documents/Private/LifeOS/.astro/content-modules.mjs":"chunks/content-modules_Bvq7llv8.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CTuSAkXJ.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.C4TLF-oP.css","/favicon.ico","/favicon.svg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/_worker.js/_astro/_slug_.C4TLF-oP.css","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/execution.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/knowledge.astro.mjs","/_worker.js/pages/lifestyle.astro.mjs","/_worker.js/pages/vitals.astro.mjs","/_worker.js/chunks/GlobalAlert_DSyPIMTV.mjs","/_worker.js/chunks/Layout_C5FsecMX.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_C4Qiu_O0.mjs","/_worker.js/chunks/_astro_assets_BSDUNE2_.mjs","/_worker.js/chunks/_astro_data-layer-content_CTuSAkXJ.mjs","/_worker.js/chunks/astro-designed-error-pages_2A6o4pfv.mjs","/_worker.js/chunks/astro_uG0guYXl.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/consts_DBS1dnOp.mjs","/_worker.js/chunks/content-assets_XqCgPAV2.mjs","/_worker.js/chunks/content-modules_Bvq7llv8.mjs","/_worker.js/chunks/index_B_cbUwUp.mjs","/_worker.js/chunks/noop-middleware_2XqmwjZg.mjs","/_worker.js/chunks/parse_CDBk4F85.mjs","/_worker.js/chunks/path_BgNISshD.mjs","/_worker.js/chunks/remote_CrdlObHx.mjs","/_worker.js/chunks/sharp_DARSZ1GH.mjs","/_worker.js/pages/api/_---path_.astro.mjs","/_worker.js/pages/execution/_slug_.astro.mjs","/_worker.js/chunks/astro/server_29JV-YUN.mjs"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"TbrPiQ9qChxZJ2nCjUYt63hhFO1gG3DZ5PPnMfcUn5E=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
