# 荖慕工作室｜接案網站

使用 [Astro](https://astro.build/) 製作的靜態網站，預計部署在 GitHub Pages。

## 資料夾說明

| 位置 | 內容 |
|---|---|
| `src/pages/index.astro` | 首頁，由各個區塊零件組成 |
| `src/components/` | 區塊零件：頁首、主視覺、精選現場、服務項目、關於荖慕、合作流程、聯絡我們、頁尾、浮動聯絡鈕 |
| `src/layouts/BaseLayout.astro` | 所有頁面共用的外框（`<head>` 設定、頁首、頁尾） |
| `src/styles/global.css` | 全站樣式 |
| `public/images/` | 網站使用的圖片 |
| `public/site.js` | 手機選單、案例淡入動畫等互動效果 |

## 在電腦上預覽（需要先安裝 Node.js 22.23.4 以上）

```bash
npm install
npm run dev
```

接著用瀏覽器開啟終端機顯示的網址（例如 `http://localhost:4321/laomu-website/`）。
