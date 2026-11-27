// 產生網站內的連結與圖片路徑，會自動加上網站的 base（例如 /laomu-website）。
// 之後換成正式網址、移除 base 時，這裡不用改。
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// 圖片檔名 → 完整路徑。例：img('logo.png') → /laomu-website/images/logo.png
export const img = (file) => `${base}/images/${file}`;

// 案例資料裡的圖片路徑（/images/xxx.jpg）→ 完整路徑
export const asset = (path) => `${base}${path}`;

// 站內連結。例：url('#works') → /laomu-website/#works；url('works/') → /laomu-website/works/
export const url = (path = '') => `${base}/${path.replace(/^\//, '')}`;
