/**
 * CONFIGURATION & DATA
 * d1: The IMDb link to pull Name and Thumbnail from.
 * d2: The video link that plays when clicked.
 */
const content = [
    {
        d1: "https://www.imdb.com/title/tt39139925/", 
        d2: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        d1: "https://www.imdb.com/title/tt0468569/", 
        d2: "https://www.youtube.com/embed/EXeTwQWrcwY"
    }
];

// Public proxy to bypass CORS restrictions when fetching IMDb data
const CORS_PROXY = "https://api.allorigins.win/get?url=";

/**
 * EXTRACTION LOGIC
 * Fetches the HTML from IMDb and finds the "Open Graph" tags
 * which contain the movie title and poster image.
 */
async function fetchMovieMetadata(url) {
    try {
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
        const json = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(json.contents, 'text/html');
        
        // Extracting Title (cleaning off the IMDb suffix) and Image URL
        const title = doc.querySelector('meta[property="og:title"]')?.content.split(' (')[0] || "Unknown Title";
        const img = doc.querySelector('meta[property="og:image"]')?.content || "";
        
        return { title, img };
    } catch (error) {
        console.error("Metadata fetch failed:", error);
        return { 
            title: "Metadata Error", 
            img: "https://via.placeholder.com/300x450?text=No+Poster" 
        };
    }
}

/**
 * UI RENDERING
 * Builds the 2-column grid cards dynamically.
 */
async function buildGallery() {
    const grid = document.getElementById('grid');
    
    for (const item of content) {
        // 1. Get the data from the d1 link
        const data = await fetchMovieMetadata(item.d1);
        
        // 2. Create the HTML Card
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${data.img}" class="poster" alt="Poster">
            <div class="meta">
                <p class="movie-name">${data.title}</p>
            </div>
        `;
        
        // 3. Set click event for the d2 player link
        card.onclick = () => launchVideoPlayer(item.d2);
        
        grid.appendChild(card);
    }
}

/**
 * PLAYER LOGIC
 * Opens the video in landscape/fullscreen mode.
 */
function launchVideoPlayer(videoUrl) {
    const overlay = document.getElementById('player-overlay');
    const frame = document.getElementById('video-frame');
    
    frame.src = videoUrl;
    overlay.style.display = 'block';
    
    // Attempt to force landscape mode
    if (overlay.requestFullscreen) {
        overlay.requestFullscreen();
    } else if (overlay.webkitRequestFullscreen) {
        overlay.webkitRequestFullscreen();
    }

    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch((err) => {
            console.log("Landscape lock requires mobile device/user gesture.");
        });
    }
}

/**
 * CLOSE PLAYER LOGIC
 */
document.getElementById('close-player').onclick = () => {
    const overlay = document.getElementById('player-overlay');
    const frame = document.getElementById('video-frame');
    
    overlay.style.display = 'none';
    frame.src = ""; // Stop video playback
    
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
};

// INITIALIZE
window.addEventListener('DOMContentLoaded', buildGallery);
