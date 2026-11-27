// 產生圖片路徑，會自動加上網站的 base（例如 /laomu-website）。
// 之後換成正式網址、移除 base 時，這裡不用改。
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const img = (file) => `${base}/images/${file}`;
