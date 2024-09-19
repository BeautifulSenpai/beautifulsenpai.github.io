const artists = [
    { name: "Ado", image: "https://i.scdn.co/image/ab67616100005174f3bb04995cb61f04936424ee" },
    { name: "Reol", image: "https://cdn.myanimelist.net/images/voiceactors/1/68461.jpg" },
    { name: "Mariya Takeuchi", image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84303352c2c35b0ea24848a4c1" },
    { name: "Hikaru Utada", image: "https://saintaudio.com/wp-content/uploads/2022/03/hikaru-utada-cover-photo.png?w=1024" },
    { name: "ReoNa", image: "https://s4.anilist.co/file/anilistcdn/staff/large/n134741-PbZtogLItOVf.jpg" },
    { name: "Man with a Mission", image: "https://images.genius.com/970d6c9f49ec11dcb4854255aa5ba4bf.1000x1000x1.jpg" },
];


function createArtistElement(artist) {
    const div = document.createElement('div');
    div.className = 'artist';
    div.innerHTML = `
        <img src="${artist.image}" alt="${artist.name}">
        <p>${artist.name}</p>
    `;
    return div;
}

function populateArtistsGrid() {
    const grid = document.querySelector('.multiple-items');
    artists.forEach(artist => {
        grid.appendChild(createArtistElement(artist));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateArtistsGrid();

    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    });
});