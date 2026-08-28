/**
 * Generates the raw bookmarklet JS snippet for Suno SRT export.
 */
export function getBookmarkletCode(): string {
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
      await navigator.clipboard.writeText(srtContent);
      alert('✅ SRT歌詞データをクリップボードにコピーしました！\\nMVプロンプト作成アプリの画面にペーストしてください。');
    } catch(err){
      alert('エラーが発生しました: ' + err.message);
    }
  }
  fetchSunoSrt();
})();`;
  
  return rawJs.replace(/\s+/g, ' ').trim();
}
