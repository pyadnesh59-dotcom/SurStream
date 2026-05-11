const apiKey = 'AIzaSyB-sQk0RwqAbKy36pPI3AmIVcCr5DW3VKA';

async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const url = `https://googleapis.com{encodeURIComponent(query)}&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
            displayResults(data.items);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumb = item.snippet.thumbnails.medium.url;

        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <img src="${thumb}" style="width:200px; border-radius:10px;">
            <h3>${title}</h3>
            <button onclick="window.open('https://youtube.com{videoId}')">Play</button>
        `;
        resultsDiv.appendChild(card);
    });
}
