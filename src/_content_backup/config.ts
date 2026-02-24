import { defineCollection, z } from 'astro:content';

// 【象限一：执行层 Execution】—— 你的输出与生产
// 涵盖：Hands-on Projects, Developer, Job
const execution = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subType: z.enum(['Project', 'Job', 'Dev']), 
    status: z.enum(['Active', 'Paused', 'Done']),
    tags: z.array(z.string()).default([]),
    date: z.date(),
  }),
});

// 【象限二：认知层 Knowledge】—— 你的输入与积累
// 涵盖：AIGC, Finance & Economics, Arts (Wiki内容)
const knowledge = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    topic: z.enum(['AIGC', 'Finance', 'Arts', 'General']),
    updatedDate: z.date(),
    source: z.string().default('Lark Wiki'), // 标记来源，方便以后溯源
  }),
});

// 【象限三：审计层 Vitals】—— 你的底层逻辑与健康
// 涵盖：Health Management, 信念, 痛点挖掘, 人生建议
const vitals = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['Belief', 'Pain-Point', 'Health', 'Reflection']),
    intensity: z.number().min(1).max(5).optional(), // 情绪扰动等级
    date: z.date(),
  }),
});

// 【象限四：生活层 Lifestyle】—— 你的日常与消费
// 涵盖：Budgeting, Entertainment, 娱乐领域
const lifestyle = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Budget', 'Entertainment', 'Travel', 'Shopping']),
    cost: z.number().optional(), // 方便后续对接 Budgeting
    date: z.date(),
  }),
});

export const collections = { execution, knowledge, vitals, lifestyle };