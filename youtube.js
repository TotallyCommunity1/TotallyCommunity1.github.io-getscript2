const channel1 = "UCazGTxIw9e9bdVnR2qbSYEA"; // main channel
const channel2 = "UCLbcla_6HSJYBIyMhf_Osag";  // other channel

function loadVideos(channelId, containerId) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  fetch(api)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) return;

      let html = "";
      for (let i = 0; i < Math.min(3, data.items.length); i++) {
        const videoId = data.items[i].link.split("v=")[1];
        html += `
          <iframe
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allowfullscreen>
          </iframe>
        `;
      }

      document.getElementById(containerId).innerHTML = html;
    })
    .catch(err => console.error("YouTube load failed:", err));
}

loadVideos(channel1, "channel1");
loadVideos(channel2, "channel2");
