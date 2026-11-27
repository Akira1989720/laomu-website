// 案例資料的欄位定義。
// 每個案例是 src/content/works/ 裡的一份 .md 檔；檔名就是案例內頁的「網址代稱」。
// 例如 chiayi-arts-2025.md → /works/chiayi-arts-2025/
// 之後接上後台（Pages CMS）時，後台的案例表單會對應這裡的欄位。
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 圖片路徑一律寫成 /images/檔名，例如 /images/works-01.jpg
const imagePath = z.string().startsWith('/images/');

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),                                  // 案名（必填）
    category: z.enum(['政府標案', '企業專案']),           // 類型（篩選用）
    year: z.number().int(),                             // 年份（排序用，新的在前）
    client: z.string().optional(),                      // 主辦／委託單位（可留空）
    location: z.string().optional(),                    // 地點（可留空）
    scope: z.array(z.string()).default([]),             // 負責範圍（可多項）
    summary: z.string(),                                // 一句話摘要（列表卡片用）
    cover: imagePath,                                   // 封面照片
    coverAlt: z.string().default(''),                   // 封面照片的文字描述（給螢幕報讀與搜尋引擎）
    gallery: z.array(z.object({                         // 現場照片集
      image: imagePath,
      caption: z.string().optional(),
    })).default([]),
    video: z.string().url().optional(),                 // YouTube 影片網址（可留空，貼上一般分享網址即可）
    featured: z.boolean().default(false),               // 是否出現在首頁「精選現場」
  }),
});

export const collections = { works };
