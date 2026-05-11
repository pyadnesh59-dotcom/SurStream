const apiKey = 'AIzaSyB-sQk0RwqAbKy36pPI3AmIVcCr5DW3VKA';

async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const url = `https://googleapis.com{encodeURIComponent(query + " music")}&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error("Error fetching from YouTube:", error);
    }
}

function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <img src="${thumbnail}" alt="thumb" style="width:200px; border-radius:10px;">
            <h3 style="font-size:16px;">${title}</h3>
            <button onclick="playSong('${videoId}')">Play</button>
        `;
        resultsDiv.appendChild(card);
    });
}

function playSong(id) {
    window.open(`https://youtube.com{id}`, '_blank');
}
