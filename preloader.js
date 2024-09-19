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
            transition: opacity 1s ease-out, visibility 0s 1s; /* Плавное исчезновение с задержкой для visibility */
        `;

        const text = document.createElement('div');
        text.textContent = 'よろしく';
        text.style.cssText = `
            color: white;
            font-size: 5rem;
            font-weight: bold;
        `;

        this.preloader.appendChild(text);
        document.body.appendChild(this.preloader);
        document.body.style.overflow = 'hidden';  // Отключаем скролл пока активен прелоадер
    }

    hide() {
        requestAnimationFrame(() => {  // Оптимизация для плавности
            setTimeout(() => {
                this.preloader.style.opacity = '0'; // Плавное изменение opacity
                this.preloader.style.visibility = 'hidden'; // Скрытие прелоадера после завершения анимации
                document.body.style.overflow = '';  // Включаем скролл обратно
                setTimeout(() => {
                    this.preloader.remove(); // Удаляем элемент после анимации
                }, 1000); // Даем время для завершения перехода opacity
            }, 3000); // Задержка перед скрытием прелоадера
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const preloader = new Preloader();
    preloader.hide();

    preloader.hide = function () {
        setTimeout(() => {
            document.body.classList.add('loaded'); // Добавляем класс после загрузки
            document.getElementById('preloader').classList.add('fade-out');
            document.querySelector('.content').classList.add('slide-up');
            document.querySelector('.video-slide').classList.add('fade-in');
        }, 3000);
    };
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('preloader').classList.add('fade-out');
        document.body.classList.add('loaded'); // Включаем отображение контента
        document.querySelector('.content').classList.add('slide-up');
        document.querySelector('.video-slide').classList.add('fade-in');
    }, 3000);
});

