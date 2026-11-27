// @ts-check
import { defineConfig } from 'astro/config';

// 網站目前預計放在 GitHub Pages 的測試網址：
// https://akira1989720.github.io/laomu-website/
// 之後綁定正式網址（例如 laomu.com.tw）時，要把 site 換成正式網址，並移除 base。
export default defineConfig({
  site: 'https://akira1989720.github.io',
  base: '/laomu-website',
});
