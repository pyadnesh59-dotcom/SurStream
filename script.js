const clientId = '06d21b67a58c4f3bb6f18a3ad9c6fff4'; // 
const clientSecret = '2d8f3cd7f9d64c779dd38c3e950bc95a'; //

async function getAccessToken() {
    const response = await fetch('https://spotify.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    if (!query) return alert("Please type a song name!");

    const token = await getAccessToken();
    const response = await fetch(`https://spotify.com{encodeURIComponent(query)}&type=track&limit=8`, {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await response.json();
    displayResults(data.tracks.items);
}

function displayResults(tracks) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    tracks.forEach(track => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <img src="${track.album.images[0].url}" alt="Album Art" style="width:200px; border-radius:10px;">
            <h3>${track.name}</h3>
            <p>${track.artists[0].name}</p>
            <button onclick="playSong('${track.name}', '${track.artists[0].name}')">Play Full Song</button>
        `;
        resultsDiv.appendChild(card);
    });
}

function playSong(songName, artistName) {
    const query = `${songName} ${artistName}`;
    const youtubeUrl = `https://youtube.com{encodeURIComponent(query)}`;
    window.open(youtubeUrl, '_blank'); 
}
