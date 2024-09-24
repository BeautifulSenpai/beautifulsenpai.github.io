class Preloader {
    constructor() {
        this.preloader = document.createElement('div');
        this.preloader.id = 'preloader';
        this.preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 1s ease-out, visibility 0s 1s;
        `;

        const gif = document.createElement('img');
        gif.src = 'assets/bancho.gif';
        gif.style.cssText = `
            width: 400px;
            height: auto;
        `;

        this.preloader.appendChild(gif);
        document.body.appendChild(this.preloader);
        document.body.style.overflow = 'hidden';
    }

    hide() {
        requestAnimationFrame(() => {
            setTimeout(() => {
                this.preloader.style.opacity = '0';
                this.preloader.style.visibility = 'hidden';
                document.body.style.overflow = '';
                setTimeout(() => {
                    this.preloader.remove();
                }, 1000);
            }, 3000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const preloader = new Preloader();
    preloader.hide();

    preloader.hide = function () {
        setTimeout(() => {
            document.body.classList.add('loaded');
            document.getElementById('preloader').classList.add('fade-out');
            document.querySelector('.content').classList.add('slide-up');
            document.querySelector('.video-slide').classList.add('fade-in');
        }, 3000);
    };
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('preloader').classList.add('fade-out');
        document.body.classList.add('loaded');
        document.querySelector('.content').classList.add('slide-up');
        document.querySelector('.video-slide').classList.add('fade-in');
    }, 3000);
});

