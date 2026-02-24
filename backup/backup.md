killall -9 node
pkill -9 workerd
pkill -9 wrangler

rm -rf node_modules package-lock.json
rm -rf .astro .wrangler
npm cache clean --force


npm install
npm install wrangler@latest --save-dev


export CLOUDFLARE_API_TOKEN="你的真实令牌"
npx wrangler whoami



npx wrangler d1 execute lifeos-db --local --config=wrangler.json --command="
CREATE TABLE IF NOT EXISTS monthly_budgets (id INTEGER PRIMARY KEY AUTOINCREMENT, month TEXT NOT NULL, amount REAL NOT NULL, currency TEXT DEFAULT 'CNY'); CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL NOT NULL, currency TEXT DEFAULT 'CNY', category TEXT NOT NULL, description TEXT, date TEXT NOT NULL); CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, status TEXT DEFAULT 'Planned', area TEXT, tags TEXT, cost REAL DEFAULT 0.0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS knowledge (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, topic TEXT NOT NULL, content TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS vitals (id INTEGER PRIMARY KEY AUTOINCREMENT, mood_score INTEGER, stress_level INTEGER, reflection TEXT, date TEXT); CREATE TABLE IF NOT EXISTS principles (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, content TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS the_void (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, status TEXT DEFAULT 'pending', target_date TEXT NOT NULL, notes TEXT); CREATE TABLE IF NOT EXISTS connections (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, tags TEXT DEFAULT '未分类', closeness INTEGER DEFAULT 0, last_contact TEXT, details TEXT, judgment TEXT, birthday TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP); INSERT OR IGNORE INTO principles (id, category, content) VALUES (1, 'Cognition', '复利是世界第八大奇迹'), (2, 'Principles', '不做任何不可逆的决定'), (3, 'Vision', '构建一个自动运行的数字资产帝国');
"

npx wrangler d1 execute lifeos-db --remote --command="
CREATE TABLE IF NOT EXISTS monthly_budgets (id INTEGER PRIMARY KEY AUTOINCREMENT, month TEXT NOT NULL, amount REAL NOT NULL, currency TEXT DEFAULT 'CNY'); CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL NOT NULL, currency TEXT DEFAULT 'CNY', category TEXT NOT NULL, description TEXT, date TEXT NOT NULL); CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, status TEXT DEFAULT 'Planned', area TEXT, tags TEXT, cost REAL DEFAULT 0.0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS knowledge (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, topic TEXT NOT NULL, content TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS vitals (id INTEGER PRIMARY KEY AUTOINCREMENT, mood_score INTEGER, stress_level INTEGER, reflection TEXT, date TEXT); CREATE TABLE IF NOT EXISTS principles (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, content TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS the_void (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, status TEXT DEFAULT 'pending', target_date TEXT NOT NULL, notes TEXT); CREATE TABLE IF NOT EXISTS connections (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, tags TEXT DEFAULT '未分类', closeness INTEGER DEFAULT 0, last_contact TEXT, details TEXT, judgment TEXT, birthday TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP); INSERT OR IGNORE INTO principles (id, category, content) VALUES (1, 'Cognition', '复利是世界第八大奇迹'), (2, 'Principles', '不做任何不可逆的决定'), (3, 'Vision', '构建一个自动运行的数字资产帝国');
"

npm run dev

npx wrangler d1 list

wrangler.json

{
  "name": "lifeos",
  "pages_build_output_dir": "./dist",
  "compatibility_date": "2024-02-22",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "lifeos-db",
      "database_id": "在这里粘贴你刚刚复制的 ID",
      "preview_database_id": "DB"
    }
  ]
}

npm run build

npx wrangler pages deploy ./dist --project-name lifeos

npx wrangler pages secret put DEEPSEEK_API_KEY --project-name lifeos

npx wrangler pages deploy ./dist --project-name lifeos



npx wrangler d1 export lifeos-db --remote --output ./backup-$(date +'%Y-%m-%d').sql
