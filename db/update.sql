DROP TABLE IF EXISTS connections;
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