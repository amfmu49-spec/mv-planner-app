/**
 * Generates the raw bookmarklet JS snippet for Suno SRT export.
 */
export function getBookmarkletCode(appUrl?: string): string {
  const targetUrl = appUrl || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://localhost');

  const rawJs = `javascript:(function(){
  async function fetchSunoSrt(){
    let path = window.location.pathname;
    if(!path.startsWith('/song/')){
      alert('Sunoの楽曲ページ (suno.com/song/...) で実行してください。');
      return;
    }
    let songId = path.split('/').pop();
    function getCookie(name){
      let v = '; ' + document.cookie;
      let p = v.split('; ' + name + '=');
      if(p.length >= 2) return p.pop().split(';').shift();
    }
    let token = getCookie('__session');
    if(!token){
      alert('Sunoにログインしてから実行してください。');
      return;
    }
    try {
      let res = await fetch('https://studio-api.prod.suno.com/api/gen/' + songId + '/aligned_lyrics/v2/', {
        headers: { Authorization: 'Bearer ' + token }
      });
      if(!res.ok) { alert('歌詞同期データの取得に失敗しました。'); return; }
      let data = await res.json();
      let lyrics = Array.isArray(data.aligned_lyrics) ? data.aligned_lyrics : (data.data?.aligned_lyrics || []);
      if(!lyrics.length) { alert('この曲にはまだ同期歌詞データがありません。'); return; }
      
      let srtLines = [];
      let idx = 1;
      for(let item of lyrics){
        let text = (item.text || item.word || '').trim();
        if(!text) continue;
        let start = item.start_s || 0;
        let end = item.end_s || (start + 2.5);
        
        function formatSrtTime(sec){
          let h = Math.floor(sec / 3600);
          let m = Math.floor((sec % 3600) / 60);
          let s = Math.floor(sec % 60);
          let ms = Math.floor((sec % 1) * 1000);
          return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+','+String(ms).padStart(3,'0');
        }
        srtLines.push(idx + '\\n' + formatSrtTime(start) + ' --> ' + formatSrtTime(end) + '\\n' + text + '\\n');
        idx++;
      }
      let srtContent = srtLines.join('\\n');
      try { await navigator.clipboard.writeText(srtContent); } catch(e){}

      let existing = document.getElementById('mv-planner-overlay');
      if(existing) existing.remove();

      let overlay = document.createElement('div');
      overlay.id = 'mv-planner-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:9999999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;padding:20px;box-sizing:border-box;';
      overlay.innerHTML = \`
        <div style="background:#0f172a;border:1px solid #6366f1;border-radius:20px;padding:32px 24px;max-width:420px;width:100%;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.8);color:#fff;">
          <div style="font-size:48px;margin-bottom:12px;">✅</div>
          <h3 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#fff;">歌詞データの取得完了！</h3>
          <p style="margin:0 0 24px 0;font-size:14px;color:#94a3b8;line-height:1.6;">「閉じる」ボタンをタップすると、自動的にアプリへ移動し歌詞がセットされます。</p>
          <button id="mv-planner-close-btn" style="background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;padding:14px 28px;border-radius:12px;font-weight:bold;font-size:16px;cursor:pointer;width:100%;box-shadow:0 4px 14px rgba(99,102,241,0.4);">
            閉じる（アプリへ自動移動）
          </button>
        </div>
      \`;
      document.body.appendChild(overlay);
      document.getElementById('mv-planner-close-btn').onclick = function(){
        try { navigator.clipboard.writeText(srtContent); } catch(e){}
        let navUrl = '${targetUrl}?srt=' + encodeURIComponent(srtContent);
        window.location.href = navUrl;
      };
    } catch(err){
      alert('エラーが発生しました: ' + err.message);
    }
  }
  fetchSunoSrt();
})();`;
  
  return rawJs.replace(/\s+/g, ' ').trim();
}
