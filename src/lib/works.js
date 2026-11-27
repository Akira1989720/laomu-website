// 讀取案例資料的共用工具。
import { getCollection } from 'astro:content';
import { url } from './paths.js';

// 類型 → 篩選用的英文代號（會出現在網址上，例如 /works/?type=gov）
export const categories = [
  { label: '政府標案', key: 'gov' },
  { label: '企業專案', key: 'corp' },
];

export const categoryKey = (label) => categories.find((c) => c.label === label)?.key ?? 'other';

// 所有案例，依年份由新到舊排序；同年份依案名排序
export async function getSortedWorks() {
  const works = await getCollection('works');
  return works.sort(
    (a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title, 'zh-Hant'),
  );
}

// 案例內頁的網址
export const workUrl = (work) => url(`works/${work.id}/`);
