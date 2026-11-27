// 把各種 YouTube 網址轉成影片代碼，用來嵌入播放器。
// 支援：youtube.com/watch?v=…、youtu.be/…、youtube.com/shorts/…、youtube.com/embed/…、youtube.com/live/…
// 無法辨識時回傳 null（頁面會改成顯示「到 YouTube 觀看」的連結）。
export function youtubeId(link) {
  if (!link) return null;
  let u;
  try {
    u = new URL(link.trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www\.|m\.|music\.)/, '');
  let id = null;
  if (host === 'youtu.be') {
    id = u.pathname.split('/')[1];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (u.pathname === '/watch') id = u.searchParams.get('v');
    else {
      const [, kind, value] = u.pathname.split('/');
      if (['shorts', 'embed', 'live', 'v'].includes(kind)) id = value;
    }
  }
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}
