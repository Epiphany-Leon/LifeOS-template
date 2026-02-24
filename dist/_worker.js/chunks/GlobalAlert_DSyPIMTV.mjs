globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, m as maybeRenderHead, k as addAttribute, r as renderTemplate, i as createAstro } from './astro/server_29JV-YUN.mjs';

const $$Astro = createAstro();
const $$GlobalAlert = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GlobalAlert;
  const { variance = 0, stress = 0 } = Astro2.props;
  const isOverBudget = variance < 0;
  const isHighStress = stress > 7;
  const isAlert = isOverBudget || isHighStress;
  const alertBg = isAlert ? "bg-rose-50/90 border-rose-200" : "bg-slate-900/90 border-slate-800";
  const alertText = isAlert ? "text-rose-600" : "text-slate-300";
  const indicatorBg = isAlert ? "bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]";
  const targetLink = isOverBudget ? "/lifestyle" : "/vitals";
  const formatMoney = (num) => Math.abs(num).toLocaleString(void 0, { maximumFractionDigits: 0 });
  return renderTemplate`${maybeRenderHead()}<div class="fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none z-50"> <div${addAttribute(`pointer-events-auto relative px-6 py-3 rounded-full border backdrop-blur-md shadow-2xl flex items-center gap-4 transition-all duration-500 hover:scale-105 ${alertBg}`, "class")}> <div${addAttribute(`w-2.5 h-2.5 rounded-full ${indicatorBg}`, "class")}></div> <span${addAttribute(`text-[10px] font-black uppercase tracking-[0.2em] ${alertText}`, "class")}>System Alert</span> <span${addAttribute(`w-px h-4 ${isAlert ? "bg-rose-200" : "bg-white/20"}`, "class")}></span> <div${addAttribute(`text-xs font-bold font-mono tracking-tight flex items-center gap-3 ${alertText}`, "class")}> <span>${variance >= 0 ? "\u76C8\u4F59" : "\u8D64\u5B57"}: ${variance >= 0 ? "+" : "-"}${formatMoney(variance)}</span> <span class="opacity-50">|</span> <span>压力负荷: ${stress}/10</span> <span class="animate-pulse">→</span> </div> <a${addAttribute(targetLink, "href")} class="absolute inset-0 z-10 block w-full h-full" aria-label="Navigate to System Management"></a> </div> </div>`;
}, "/Users/admin/Documents/Private/LifeOS/src/components/GlobalAlert.astro", void 0);

export { $$GlobalAlert as $ };
