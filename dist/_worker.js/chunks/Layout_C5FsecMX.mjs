globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, k as addAttribute, l as renderHead, n as renderSlot, r as renderTemplate, i as createAstro } from './astro/server_29JV-YUN.mjs';
/* empty css                          */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="zh-cn"> <head><meta charset="UTF-8"><meta name="description" content="Lihong's LifeOS"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen text-slate-700 antialiased selection:bg-cyan-200 selection:text-cyan-900 overflow-x-hidden bg-gradient-to-br from-[#00a5d8] via-[#73ffee] to-[#ffffeb] bg-fixed"> <div class="fixed top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-white/30 blur-[100px] pointer-events-none mix-blend-overlay"></div> <div class="fixed bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-white/40 blur-[120px] pointer-events-none mix-blend-overlay"></div> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/admin/Documents/Private/LifeOS/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
