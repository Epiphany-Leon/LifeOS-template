import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.json'
    }
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        // 👇 核心修复：严禁 Vite 监控这些自动生成的动态目录，彻底斩断无限重启循环
        ignored: ['**/.wrangler/**', '**/.astro/**', '**/dist/**', '**/node_modules/**']
      }
    }
  }
});