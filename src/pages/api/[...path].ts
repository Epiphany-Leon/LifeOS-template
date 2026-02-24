export const prerender = false;

import type { APIRoute } from 'astro';
import { Hono } from 'hono';

const app = new Hono<{ Bindings: { DB: any, DEEPSEEK_API_KEY: string } }>().basePath('/api');

// ==========================================
// 1. 系统初始化与核心工具 (Temporary Init)
// ==========================================
app.get('/init-connections', async (c) => {
  try {
    const DB = c.env.DB;
    await DB.prepare(`DROP TABLE IF EXISTS connections;`).run();
    await DB.prepare(`
      CREATE TABLE connections (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT NOT NULL, 
          tags TEXT NOT NULL DEFAULT '未分类', 
          closeness INTEGER DEFAULT 0, 
          last_contact TEXT, 
          details TEXT, 
          judgment TEXT,
          birthday TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `).run();
    return c.json({ success: true, message: "Connections 表重建成功！" });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// ==========================================
// 2. 仪表盘 (Dashboard) AI 名言引擎
// ==========================================
app.get('/dashboard/quote', async (c) => {
  const db = c.env.DB;
  const apiKey = c.env.DEEPSEEK_API_KEY;

  try {
    const latestVital = await db.prepare(
      "SELECT mood_score, stress_level, reflection FROM vitals ORDER BY date DESC LIMIT 1"
    ).first();

    const mood = latestVital?.mood_score || 6;
    const reflection = latestVital?.reflection || "正常运行中";
    
    let tier = "";
    if (mood <= 2) tier = "差 (Critical/Exhausted)";
    else if (mood <= 4) tier = "较差 (Struggling/Low)";
    else if (mood <= 6) tier = "正常 (Equilibrium/Stable)";
    else if (mood <= 8) tier = "较好 (Growth/Flow)";
    else tier = "好 (Peak/Excellent)";

    const prompt = `
      你是我的 LifeOS 顾问。我的状态：【${tier}】，心情分 ${mood}/10，最近觉知：“${reflection}”。
      任务：结合我的当前状态，匹配一句深刻的中英文名人名言。
      请直接返回 JSON 格式，绝对不要包含 markdown 代码块标签（如 \`\`\`json）：
      { "quote": "名言正文", "author": "作者名", "tier": "${tier}" }
    `;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.7 })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    // ✅ 强力修复：剥离所有可能的 Markdown 外壳
    let rawContent = data.choices[0].message.content.trim();
    rawContent = rawContent.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();

    return c.json(JSON.parse(rawContent));
  } catch (e: any) {
    console.error("Quote Fetch Error:", e.message);
    return c.json({ quote: "Your life is an enterprise; you are its CEO.", author: "System", tier: "正常" });
  }
});

// ==========================================
// 3. 生活层 (Lifestyle) CRUD
// ==========================================
app.post('/expenses', async (c) => {
  try {
    const DB = c.env.DB;
    const { amount, currency = 'CNY', category, description, date } = await c.req.json();
    const finalDate = date ? date.slice(0, 10) : new Date().toISOString().slice(0, 10); 
    await DB.prepare(`INSERT INTO expenses (amount, currency, category, description, date) VALUES (?, ?, ?, ?, ?)`).bind(amount, currency, category, description, finalDate).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.put('/expenses/:id', async (c) => {
  try {
    const DB = c.env.DB;
    const id = c.req.param('id');
    const { amount, currency = 'CNY', category, description, date } = await c.req.json();
    const finalDate = date ? date.slice(0, 10) : new Date().toISOString().slice(0, 10);
    await DB.prepare(`UPDATE expenses SET amount = ?, currency = ?, category = ?, description = ?, date = ? WHERE id = ?`).bind(amount, currency, category, description, finalDate, id).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.delete('/expenses/:id', async (c) => {
  try {
    await c.env.DB.prepare(`DELETE FROM expenses WHERE id = ?`).bind(c.req.param('id')).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.post('/budgets', async (c) => {
  try {
    const db = c.env.DB;
    const { month, amount, currency = 'CNY' } = await c.req.json();
    // ✅ 修复：查询 month 而不是 id，避免主键报错
    const existing = await db.prepare("SELECT month FROM monthly_budgets WHERE month = ?").bind(month).first();
    if (existing) {
      await db.prepare("UPDATE monthly_budgets SET amount = ?, currency = ? WHERE month = ?").bind(amount, currency, month).run();
    } else {
      await db.prepare("INSERT INTO monthly_budgets (month, amount, currency) VALUES (?, ?, ?)").bind(month, amount, currency).run();
    }
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.post('/connections', async (c) => {
  try {
    const DB = c.env.DB;
    const { name, tags, closeness, last_contact, details, judgment, birthday } = await c.req.json();
    await DB.prepare(`INSERT INTO connections (name, tags, closeness, last_contact, details, judgment, birthday) VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(name, tags || '未分类', closeness || 0, last_contact, details, judgment, birthday).run();
    return c.json({ success: true });
  } catch (e: any) { return c.json({ success: false, error: e.message }, 500); }
});

app.put('/connections/:id', async (c) => {
  try {
    const DB = c.env.DB;
    const id = c.req.param('id');
    const { name, tags, closeness, last_contact, details, judgment, birthday } = await c.req.json();
    await DB.prepare(`UPDATE connections SET name=?, tags=?, closeness=?, last_contact=?, details=?, judgment=?, birthday=? WHERE id=?`).bind(name, tags, closeness, last_contact, details, judgment, birthday, id).run();
    return c.json({ success: true });
  } catch (e: any) { return c.json({ success: false, error: e.message }, 500); }
});

app.delete('/connections/:id', async (c) => {
  try {
    await c.env.DB.prepare(`DELETE FROM connections WHERE id = ?`).bind(c.req.param('id')).run();
    return c.json({ success: true });
  } catch (e: any) { return c.json({ success: false, error: e.message }, 500); }
});

// ==========================================
// 4. 执行层 (Execution) CRUD
// ==========================================
app.post('/projects', async (c) => {
  try {
    const DB = c.env.DB;
    const { title, status = 'Planned', area, tags, cost = 0.0, date } = await c.req.json();
    const finalDate = date ? date.slice(0, 10) : new Date().toISOString().slice(0, 10);
    await DB.prepare(`INSERT INTO projects (title, status, area, tags, cost, created_at) VALUES (?, ?, ?, ?, ?, ?)`).bind(title, status, area, tags, cost, finalDate).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.put('/projects/:id', async (c) => {
  try {
    const DB = c.env.DB;
    const id = c.req.param('id');
    const { title, status, area, tags, cost, date } = await c.req.json();
    const finalDate = date ? date.slice(0, 10) : new Date().toISOString().slice(0, 10);
    await DB.prepare(`UPDATE projects SET title = ?, status = ?, area = ?, tags = ?, cost = ?, created_at = ? WHERE id = ?`).bind(title, status, area, tags, cost, finalDate, id).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.delete('/projects/:id', async (c) => {
  try {
    await c.env.DB.prepare(`DELETE FROM projects WHERE id = ?`).bind(c.req.param('id')).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.post('/todos', async (c) => {
  try {
    const DB = c.env.DB;
    const { content, target_date, notes } = await c.req.json();
    const finalDate = target_date || new Date().toISOString().slice(0, 10);
    await DB.prepare(`INSERT INTO todos (content, status, target_date, notes) VALUES (?, 'pending', ?, ?)`).bind(content, finalDate, notes || '').run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.put('/todos/:id', async (c) => {
  try {
    const DB = c.env.DB;
    const id = c.req.param('id');
    const body = await c.req.json();
    const setKeys = []; const values = [];
    if (body.status !== undefined) { setKeys.push('status = ?'); values.push(body.status); }
    if (body.content !== undefined) { setKeys.push('content = ?'); values.push(body.content); }
    if (body.notes !== undefined) { setKeys.push('notes = ?'); values.push(body.notes); }
    if (body.target_date !== undefined) { setKeys.push('target_date = ?'); values.push(body.target_date); }
    values.push(id);
    if (setKeys.length > 0) await DB.prepare(`UPDATE todos SET ${setKeys.join(', ')} WHERE id = ?`).bind(...values).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.delete('/todos/:id', async (c) => {
  try {
    await c.env.DB.prepare(`DELETE FROM todos WHERE id = ?`).bind(c.req.param('id')).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.post('/execution/eod-review', async (c) => {
  const apiKey = c.env.DEEPSEEK_API_KEY;
  try {
    const { doneList, pendingList } = await c.req.json();
    const prompt = `你是我的人生执行力教练。分析任务清单：【已完成】：${doneList.join('; ')}；【未完成】：${pendingList.join('; ')}。请给出犀利反馈并提出引导式问题。`;
    const response = await fetch("[https://api.deepseek.com/chat/completions](https://api.deepseek.com/chat/completions)", {
      method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.8 })
    });
    const data = await response.json();
    return c.json({ report: data.choices[0].message.content });
  } catch (e) { return c.json({ error: "AI 教练连接失败" }, 500); }
});

// ==========================================
// 5. 认知层 (Knowledge) CRUD & AI
// ==========================================
app.post('/knowledge', async (c) => {
  try {
    const DB = c.env.DB;
    const { title, topic, content } = await c.req.json();
    await DB.prepare(`INSERT INTO knowledge (title, topic, content) VALUES (?, ?, ?)`).bind(title, topic, content).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.put('/knowledge/:id', async (c) => {
  try {
    const DB = c.env.DB;
    const id = c.req.param('id');
    const { title, topic, content } = await c.req.json();
    await DB.prepare(`UPDATE knowledge SET title = ?, topic = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).bind(title, topic, content, id).run();
    return c.json({ success: true });
  } catch (error: any) { return c.json({ success: false, error: error.message }, 500); }
});

app.post('/knowledge/synthesize', async (c) => {
  const db = c.env.DB;
  const apiKey = c.env.DEEPSEEK_API_KEY; 
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    const { results } = await db.prepare("SELECT title, topic, content FROM knowledge WHERE updated_at >= ?").bind(sevenDaysAgo).all();
    if (!results || results.length === 0) return c.json({ report: "### 💡 尚未检测到本周资产" });
    const prompt = `你是我 LifeOS 的首席知识官。基于本周笔记生成复盘报告：1. 核心洞察 2. 认知盲区 3. 下周建议。笔记：${JSON.stringify(results.map((r:any) => ({ title: r.title, content: r.content.substring(0, 150) })))}`;
    const response = await fetch("[https://api.deepseek.com/chat/completions](https://api.deepseek.com/chat/completions)", {
      method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.7 })
    });
    const data = await response.json();
    return c.json({ report: data.choices[0].message.content });
  } catch (e) { return c.json({ error: "认知合成失败" }, 500); }
});

// ==========================================
// 6. 觉知层 (Vitals) CRUD
// ==========================================
app.put('/principles/:id', async (c) => {
  try {
    await c.env.DB.prepare("UPDATE principles SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(await c.req.json().then(d => d.content), c.req.param('id')).run();
    return c.json({ success: true });
  } catch (e) { return c.json({ success: false }, 500); }
});

app.post('/vitals', async (c) => {
  try {
    const { reflection, date, mood_score, stress_level } = await c.req.json();
    const finalDate = date || new Date().toISOString().slice(0, 10);
    // 如果前端没传（比如是 EOD 自动提交的），就默认 5分心情，30分压力
    const finalMood = mood_score !== undefined ? mood_score : 5;
    const finalStress = stress_level !== undefined ? stress_level : 30;

    await c.env.DB.prepare("INSERT INTO vitals (reflection, date, mood_score, stress_level) VALUES (?, ?, ?, ?)")
      .bind(reflection, finalDate, finalMood, finalStress)
      .run();
    return c.json({ success: true });
  } catch (e) { 
    return c.json({ success: false }, 500); 
  }
});

// 1. 修改 Vitals 觉知记录
app.put('/vitals/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { reflection, mood_score, stress_level } = await c.req.json();
    await c.env.DB.prepare("UPDATE vitals SET reflection = ?, mood_score = ?, stress_level = ? WHERE id = ?")
      .bind(reflection, mood_score, stress_level, id).run();
    return c.json({ success: true });
  } catch (e) { return c.json({ success: false }, 500); }
});

// 👇🚨 请在这里补上这关键的一段：删除 Vitals 接口 🚨👇
app.delete('/vitals/:id', async (c) => {
  try {
    await c.env.DB.prepare("DELETE FROM vitals WHERE id = ?").bind(c.req.param('id')).run();
    return c.json({ success: true });
  } catch (e) { return c.json({ success: false }, 500); }
});
// 👆🚨 补充结束 🚨👆

// 2. 删除重复的 Principle 原则
app.delete('/principles/:id', async (c) => {
  try {
    await c.env.DB.prepare("DELETE FROM principles WHERE id = ?").bind(c.req.param('id')).run();
    return c.json({ success: true });
  } catch (e) { return c.json({ success: false }, 500); }
});

app.post('/the_void', async (c) => {
  try {
    await c.env.DB.prepare("INSERT INTO the_void (content) VALUES (?)").bind(await c.req.json().then(d => d.content)).run();
    return c.json({ success: true });
  } catch (e) { return c.json({ success: false }, 500); }
});

app.post('/vitals/chat', async (c) => {
  const apiKey = c.env.DEEPSEEK_API_KEY;
  try {
    const { messages } = await c.req.json();
    const principles = await c.env.DB.prepare("SELECT content FROM principles").all();
    const systemPrompt = `你是我的灵魂导师。背景：LifeOS 用户。准则：${principles.results.map((p:any) => p.content).join('; ')}。请给出理性且具启发性的对话。`;
    const response = await fetch("[https://api.deepseek.com/chat/completions](https://api.deepseek.com/chat/completions)", {
      method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: systemPrompt }, ...messages] })
    });
    const data = await response.json();
    return c.json({ reply: data.choices[0].message.content });
  } catch (e) { return c.json({ error: "对话失败" }, 500); }
});

export const ALL: APIRoute = (context) => {
  const env = (context.locals as any).runtime?.env || {};
  return app.fetch(context.request, env);
};