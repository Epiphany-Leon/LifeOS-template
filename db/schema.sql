-- 1. 认知层 (Knowledge)：个人 Wiki 与知识沉淀表
CREATE TABLE IF NOT EXISTS knowledge (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    topic TEXT NOT NULL, -- 比如 'AIGC', 'Finance', 'Fullstack'
    content TEXT NOT NULL, -- 存储 Markdown 内容
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 执行层 (Execution)：核心产出与活跃任务表
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'Active',
    area TEXT NOT NULL,
    tags TEXT, 
    cost REAL DEFAULT 0.0, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. 觉知层 (Vitals)：底层代码与内观复盘表
CREATE TABLE IF NOT EXISTS reflections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    intensity INTEGER DEFAULT 1, -- 情绪或觉知强度的记录 (1-5)
    type TEXT NOT NULL, -- 比如 'Belief' (信念), 'PainPoint' (痛点)
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. 生活层 (Lifestyle)：一人公司记账与体验资产表
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL, -- 比如 'Entertainment', 'Learning'
    description TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);