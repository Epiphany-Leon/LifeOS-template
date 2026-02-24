globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C4Qiu_O0.mjs';
import { manifest } from './manifest_oy9zPng6.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/_---path_.astro.mjs');
const _page2 = () => import('./pages/execution/_slug_.astro.mjs');
const _page3 = () => import('./pages/execution.astro.mjs');
const _page4 = () => import('./pages/knowledge.astro.mjs');
const _page5 = () => import('./pages/lifestyle.astro.mjs');
const _page6 = () => import('./pages/vitals.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/api/[...path].ts", _page1],
    ["src/pages/execution/[slug].astro", _page2],
    ["src/pages/execution/index.astro", _page3],
    ["src/pages/knowledge/index.astro", _page4],
    ["src/pages/lifestyle/index.astro", _page5],
    ["src/pages/vitals/index.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
