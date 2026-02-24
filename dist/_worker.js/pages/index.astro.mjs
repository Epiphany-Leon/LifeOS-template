globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, h as renderComponent, i as createAstro, m as maybeRenderHead, k as addAttribute } from '../chunks/astro/server_29JV-YUN.mjs';
import { $ as $$Layout } from '../chunks/Layout_C5FsecMX.mjs';
import { $ as $$GlobalAlert } from '../chunks/GlobalAlert_DSyPIMTV.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const db = Astro2.locals.runtime?.env?.DB;
  let lifestyleData = { spent: 0, budget: 0, percent: 0, currency: "CNY" };
  let executionData = { activeCount: 0, total: 0 };
  let knowledgeCount = 0;
  let vitalsData = { moodAvg: 0, entryCount: 0, latestStress: 0, latestMood: 6 };
  let vitalsScores = [];
  let variance = 0;
  const today = /* @__PURE__ */ new Date();
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const version = `LifeOS v ${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}`;
  const exchangeRates = { CNY: 1, USD: 7.25, EUR: 7.82, GBP: 9.15, JPY: 0.048 };
  const currencySymbols = { CNY: "\xA5", USD: "$", EUR: "\u20AC", GBP: "\xA3", JPY: "\xA5" };
  if (db) {
    try {
      const fetchDb = db.batch([
        db.prepare("SELECT amount, currency FROM monthly_budgets WHERE month = ?").bind(currentMonth),
        db.prepare("SELECT amount, currency FROM expenses WHERE amount < 0 AND date LIKE ?").bind(`${currentMonth}%`),
        db.prepare("SELECT status FROM projects"),
        db.prepare("SELECT COUNT(*) as count FROM knowledge"),
        db.prepare("SELECT mood_score, stress_level FROM vitals ORDER BY date DESC LIMIT 7")
      ]);
      const batchResults = await fetchDb;
      const budgetRes = batchResults[0].results;
      if (budgetRes.length > 0) {
        lifestyleData.budget = budgetRes[0].amount;
        lifestyleData.currency = budgetRes[0].currency || "CNY";
      }
      const baseRate = exchangeRates[lifestyleData.currency] || 1;
      const expensesRes = batchResults[1].results || [];
      lifestyleData.spent = expensesRes.reduce((sum, item) => {
        const fromRate = exchangeRates[item.currency || "CNY"] || 1;
        return sum + Math.abs(item.amount) * fromRate / baseRate;
      }, 0);
      lifestyleData.percent = lifestyleData.budget > 0 ? Math.min(lifestyleData.spent / lifestyleData.budget * 100, 100) : 0;
      variance = lifestyleData.budget - lifestyleData.spent;
      const projectsRes = batchResults[2].results || [];
      executionData.total = projectsRes.length;
      executionData.activeCount = projectsRes.filter((p) => p.status === "Active").length;
      knowledgeCount = batchResults[3].results[0]?.count || 0;
      const vRes = batchResults[4].results || [];
      vitalsData.entryCount = vRes.length;
      if (vRes.length > 0) {
        vitalsData.latestStress = vRes[0].stress_level;
        vitalsData.latestMood = vRes[0].mood_score;
        vitalsData.moodAvg = vRes.reduce((s, v) => s + v.mood_score, 0) / vRes.length;
      }
      vitalsScores = [...vRes].reverse().map((v) => v.mood_score);
      while (vitalsScores.length < 7) vitalsScores.unshift(0);
    } catch (e) {
    }
  }
  const sym = currencySymbols[lifestyleData.currency] || "\xA5";
  let aiQuote = { quote: "Your life is an enterprise; you are its CEO.", author: "Lihong Gao", tier: "\u6B63\u5E38" };
  try {
    const quoteRes = await fetch(`${Astro2.url.origin}/api/dashboard/quote`);
    if (quoteRes.ok) {
      aiQuote = await quoteRes.json();
    }
  } catch (e) {
    console.error("AI Quote Fetch Failed");
  }
  const statusColors = ["bg-rose-500", "bg-amber-400", "bg-emerald-500", "bg-blue-500", "bg-purple-500"];
  const activeTierIndex = aiQuote.tier.includes("\u5DEE") && !aiQuote.tier.includes("\u8F83\u5DEE") ? 0 : aiQuote.tier.includes("\u8F83\u5DEE") ? 1 : aiQuote.tier.includes("\u6B63\u5E38") ? 2 : aiQuote.tier.includes("\u8F83\u597D") ? 3 : 4;
  return renderTemplate(_a || (_a = __template(["", ' <script>\n  const hour = new Date().getHours();\n  let greeting = "Good Night";\n  if (hour >= 5 && hour < 12) greeting = "Good Morning";\n  else if (hour >= 12 && hour < 18) greeting = "Good Afternoon";\n  else if (hour >= 18 && hour < 22) greeting = "Good Evening";\n  \n  document.getElementById(\'dynamicGreeting\').innerText = `${greeting}, Lihong.`;\n<\/script>'], ["", ' <script>\n  const hour = new Date().getHours();\n  let greeting = "Good Night";\n  if (hour >= 5 && hour < 12) greeting = "Good Morning";\n  else if (hour >= 12 && hour < 18) greeting = "Good Afternoon";\n  else if (hour >= 18 && hour < 22) greeting = "Good Evening";\n  \n  document.getElementById(\'dynamicGreeting\').innerText = \\`\\${greeting}, Lihong.\\`;\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, { "title": "LifeOS - Dashboard" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "GlobalAlert", $$GlobalAlert, { "variance": variance, "stress": vitalsData.latestStress })} ${maybeRenderHead()}<div class="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none"> <div class="max-w-7xl mx-auto flex justify-end"> <nav class="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg shadow-cyan-900/5 ring-1 ring-white/60"> <a href="/" class="px-5 py-2 rounded-full bg-white text-slate-800 font-semibold shadow-sm transition-all text-sm">Dashboard</a> <a href="/execution" class="px-4 py-2 rounded-full text-slate-600 font-medium hover:bg-white/30 transition-all text-sm">Execution</a> <a href="/knowledge" class="px-4 py-2 rounded-full text-slate-600 font-medium hover:bg-white/30 transition-all text-sm">Knowledge</a> <a href="/lifestyle" class="px-4 py-2 rounded-full text-slate-600 font-medium hover:bg-white/30 transition-all text-sm">Lifestyle</a> <a href="/vitals" class="px-4 py-2 rounded-full text-slate-600 font-medium hover:bg-white/30 transition-all text-sm">Vitals</a> </nav> </div> </div> <main class="max-w-7xl mx-auto p-6 lg:p-12 pt-32 pb-40"> <header class="mb-10 text-center md:text-left"> <h1 class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-400 tracking-tight pb-2" id="dynamicGreeting">Loading...</h1> <div class="mt-4 flex flex-col md:flex-row items-center gap-4 text-slate-500"> <span class="px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-lg font-mono shadow-sm tracking-widest">${version}</span> <span class="text-sm font-medium italic">"Intelligence meets Consciousness."</span> </div> </header> <div class="mb-8 animate-in fade-in zoom-in duration-1000"> <div class="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group"> <div class="absolute top-8 right-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50"> ${statusColors.map((color, index) => renderTemplate`<div${addAttribute(`w-2 h-2 rounded-full transition-all duration-700 ${index === activeTierIndex ? `${color} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)] scale-125` : "bg-slate-200"}`, "class")}></div>`)} </div> <div class="max-w-5xl"> <p class="text-sm md:text-base font-serif font-medium text-slate-600 leading-relaxed text-left italic">
“${aiQuote.quote}”
</p> <div class="mt-4 text-right"> <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">— ${aiQuote.author}</span> </div> </div> <div class="absolute -bottom-6 -right-6 text-7xl opacity-[0.02] select-none italic font-serif">Aura</div> </div> </div> <div class="relative bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-4 md:p-8 shadow-2xl overflow-hidden"> <div class="absolute inset-0 pointer-events-none hidden md:block"> <div class="absolute left-1/2 top-10 bottom-10 w-px bg-slate-800/10"></div> <div class="absolute top-1/2 left-10 right-10 h-px bg-slate-800/10"></div> <div class="absolute left-1/2 top-1/2 w-4 h-4 bg-slate-800 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative z-10"> <a href="/execution" class="group bg-transparent hover:bg-white/60 p-8 rounded-[2.5rem] transition-all flex flex-col justify-between min-h-[260px]"> <div class="flex justify-between items-start mb-4"> <div class="flex items-center gap-3"> <div class="p-3.5 bg-blue-50 text-blue-500 rounded-2xl text-2xl shadow-sm border border-blue-100">🚀</div> <h2 class="text-xl font-black text-blue-600 uppercase tracking-widest">Execution</h2> </div> <div class="text-right"> <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active / Total</p> <p class="text-3xl font-black text-slate-800">${executionData.activeCount} <span class="text-sm text-slate-400 font-medium">/ ${executionData.total}</span></p> </div> </div> <div class="flex-1 flex flex-col justify-end py-2"> <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3"> <div class="bg-blue-500 h-full rounded-full transition-all duration-1000"${addAttribute(`width: ${executionData.total > 0 ? executionData.activeCount / executionData.total * 100 : 0}%`, "style")}></div> </div> <p class="text-xs text-slate-500 font-medium leading-relaxed">系统正在并发处理 <span class="font-bold text-slate-700">${executionData.activeCount}</span> 个活跃项目。</p> </div> </a> <a href="/knowledge" class="group bg-transparent hover:bg-white/60 p-8 rounded-[2.5rem] transition-all flex flex-col justify-between min-h-[260px]"> <div class="flex justify-between items-start mb-4"> <div class="flex items-center gap-3"> <div class="p-3.5 bg-purple-50 text-purple-500 rounded-2xl text-2xl shadow-sm border border-purple-100">🧠</div> <h2 class="text-xl font-black text-purple-600 uppercase tracking-widest">Knowledge</h2> </div> <div class="text-right"> <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Assets</p> <p class="text-3xl font-black text-slate-800">${knowledgeCount}</p> </div> </div> <div class="flex-1 flex flex-col justify-end py-2"> <div class="flex flex-wrap gap-2 mb-3 opacity-80"> <span class="px-2.5 py-1 bg-purple-100 text-purple-700 text-[9px] font-bold rounded-lg border border-purple-200">BAAI</span> <span class="px-2.5 py-1 bg-purple-100 text-purple-700 text-[9px] font-bold rounded-lg border border-purple-200">QUANT</span> <span class="px-2.5 py-1 bg-slate-100 text-slate-500 text-[9px] font-bold rounded-lg border border-slate-200">FINANCE</span> </div> <p class="text-xs text-slate-500 font-medium leading-relaxed">第二大脑已沉淀 <span class="font-bold text-slate-700">${knowledgeCount}</span> 个体系化认知节点。</p> </div> </a> <a href="/lifestyle" class="group bg-transparent hover:bg-white/60 p-8 rounded-[2.5rem] transition-all flex flex-col justify-between min-h-[260px]"> <div class="flex justify-between items-start mb-4"> <div class="flex items-center gap-3"> <div class="p-3.5 bg-emerald-50 text-emerald-500 rounded-2xl text-2xl shadow-sm border border-emerald-100">💰</div> <h2 class="text-xl font-black text-emerald-600 uppercase tracking-widest">Lifestyle</h2> </div> <div class="text-right"> <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Spent / Budget</p> <p class="text-3xl font-black text-slate-800">${sym}${lifestyleData.spent.toLocaleString(void 0, { maximumFractionDigits: 0 })} <span class="text-sm text-slate-400 font-medium">/ ${sym}${lifestyleData.budget.toLocaleString(void 0, { maximumFractionDigits: 0 })}</span></p> </div> </div> <div class="flex-1 flex flex-col justify-end py-2"> <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner mb-3"> <div${addAttribute(`h-full rounded-full transition-all duration-1000 ${variance < 0 ? "bg-rose-500" : "bg-emerald-400"}`, "class")}${addAttribute(`width: ${lifestyleData.percent}%`, "style")}></div> </div> <p class="text-xs text-slate-500 font-medium leading-relaxed">当前消耗率 <span${addAttribute(`font-bold ${variance < 0 ? "text-rose-500" : "text-slate-700"}`, "class")}>${lifestyleData.percent.toFixed(1)}%</span>。财务基准线监控中。</p> </div> </a> <a href="/vitals" class="group bg-transparent hover:bg-white/60 p-8 rounded-[2.5rem] transition-all flex flex-col justify-between min-h-[260px]"> <div class="flex justify-between items-start mb-4"> <div class="flex items-center gap-3"> <div class="p-3.5 bg-rose-50 text-rose-500 rounded-2xl text-2xl shadow-sm border border-rose-100">💓</div> <h2 class="text-xl font-black text-rose-600 uppercase tracking-widest">Vitals</h2> </div> <div class="text-right"> <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mood Avg (7D)</p> <p class="text-3xl font-black text-slate-800">${vitalsData.moodAvg.toFixed(1)} <span class="text-sm text-slate-400 font-medium">/ 10</span></p> </div> </div> <div class="flex-1 flex flex-col justify-end py-2"> <div class="flex gap-1.5 mb-3 h-8 items-end"> ${vitalsScores.map((score) => renderTemplate`<div class="flex-1 bg-rose-300 rounded-t-md transition-all shadow-sm"${addAttribute(`height: ${Math.max(score / 10 * 100, 10)}%`, "style")}${addAttribute(`Score: ${score}`, "title")}></div>`)} </div> <p class="text-xs text-slate-500 font-medium leading-relaxed">底层灵魂中枢监控中。本期共录入 <span class="font-bold text-slate-700">${vitalsData.entryCount}</span> 次深度觉知。</p> </div> </a> </div> </div> </main> ` }));
}, "/Users/admin/Documents/Private/LifeOS/src/pages/index.astro", void 0);

const $$file = "/Users/admin/Documents/Private/LifeOS/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
