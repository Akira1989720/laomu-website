// 案例資料的欄位定義。
// 每個案例是 src/content/works/ 裡的一份 .md 檔；檔名就是案例內頁的「網址代稱」。
// 例如 chiayi-arts-2025.md → /works/chiayi-arts-2025/
// 後台（Pages CMS）的案例表單設定在 .pages.yml，欄位要和這裡一致。
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 圖片路徑一律是 /images/檔名，例如 /images/works-01.jpg（後台上傳會自動寫成這種格式）
const imagePath = z.string().trim().startsWith('/images/');

// 後台的欄位留空時，可能存成空字串或 null；這裡一律視為「沒有填」
const optionalText = z
  .string()
  .nullish()
  .transform((v) => (v?.trim() ? v.trim() : undefined));

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string().trim().min(1),                    // 案名（必填）
    category: z.enum(['政府標案', '企業專案']),           // 類型（篩選用）
    year: z.coerce.number().int(),                      // 年份（排序用，新的在前）
    client: optionalText,                               // 主辦／委託單位（可留空）
    location: optionalText,                             // 地點（可留空）
    scope: z                                            // 負責範圍（可多項）
      .array(z.string().nullish())
      .nullish()
      .transform((list) => (list ?? []).map((s) => s?.trim()).filter((s): s is string => !!s)),
    summary: z.string().trim(),                         // 一句話摘要（列表卡片用）
    cover: imagePath,                                   // 封面照片
    coverAlt: optionalText.transform((v) => v ?? ''),   // 封面照片說明
    gallery: z                                          // 現場照片集
      .array(z.object({ image: imagePath, caption: optionalText }))
      .nullish()
      .transform((list) => list ?? []),
    video: optionalText,                                // YouTube 影片網址（可留空；無法辨識時頁面改顯示連結）
    featured: z.boolean().nullish().transform((v) => v ?? false), // 是否出現在首頁「精選現場」
  }),
});

export const collections = { works };
