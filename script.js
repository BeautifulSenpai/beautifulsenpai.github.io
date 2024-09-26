class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
    }

    hide() {
        setTimeout(() => {
            this.preloader.classList.add('fade-out');
            document.body.classList.add('loaded');
            document.querySelector('.content-wrapper').classList.add('slide-up');
            document.querySelector('.video-slide').classList.add('fade-in');
        }, 3000);
    }
}

class SpotifyPlayer {
    constructor(discordId) {
        this.discordId = discordId;
        this.container = document.getElementById('spotify-player');
    }

    async fetchData() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${this.discordId}`);
            const data = await response.json();
            return data.data.listening_to_spotify ? data.data.spotify : null;
        } catch (error) {
            console.error('Error fetching Lanyard data:', error);
            return null;
        }
    }

    render(spotifyData) {
        if (!spotifyData) {
            this.container.style.display = 'none';
            return;
        }

        this.container.style.display = 'flex';

        this.container.innerHTML = `
            <img src="${spotifyData.album_art_url}" alt="Album Art">
            <div class="spotify-info">
                <p class="song-name">${spotifyData.song}</p>
                <p class="artist-name">${spotifyData.artist}</p>
            </div>
        `;
    }

    async update() {
        const spotifyData = await this.fetchData();
        this.render(spotifyData);
    }

    start() {
        this.update();
        setInterval(() => this.update(), 30000);
    }
}

class ArtistSlider {
    constructor() {
        this.container = document.querySelector('.artist-slider');
        this.artists = [
            { name: "Ado", image: "https://i.scdn.co/image/ab67616100005174f3bb04995cb61f04936424ee" },
            { name: "Reol", image: "https://cdn.myanimelist.net/images/voiceactors/1/68461.jpg" },
            { name: "Mariya Takeuchi", image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84303352c2c35b0ea24848a4c1" },
            { name: "Hikaru Utada", image: "https://saintaudio.com/wp-content/uploads/2022/03/hikaru-utada-cover-photo.png?w=1024" },
            { name: "ReoNa", image: "https://s4.anilist.co/file/anilistcdn/staff/large/n134741-PbZtogLItOVf.jpg" },
            { name: "Man with a Mission", image: "https://images.genius.com/970d6c9f49ec11dcb4854255aa5ba4bf.1000x1000x1.jpg" },
        ];
    }

    render() {
        this.artists.forEach(artist => {
            const artistElement = document.createElement('div');
            artistElement.className = 'artist';
            artistElement.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}">
                <p>${artist.name}</p>
            `;
            this.container.appendChild(artistElement);
        });
    }

    initSlider() {
        $(this.container).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            infinite: true,
            centerMode: true,
            centerPadding: '0px',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
        });
    }

    init() {
        this.render();
        this.initSlider();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const preloader = new Preloader();
    preloader.hide();

    const spotifyPlayer = new SpotifyPlayer('375894460166307851');
    spotifyPlayer.start();

    const artistSlider = new ArtistSlider();
    artistSlider.init();
});