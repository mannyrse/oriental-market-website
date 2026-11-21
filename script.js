// Favorites carousel.
// 1. Builds a card for each item in products.js.
// 2. Clones the cards until one "half" is wider than the screen, then
//    duplicates that half so the CSS animation can slide exactly one
//    half-width and restart without a visible jump.
(function () {
    const track = document.querySelector('.carousel-track');
    if (!track || typeof products === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const PX_PER_SECOND = 20; // scroll speed: lower = slower

    function createCard(product) {
        const card = document.createElement('li');
        card.className = 'card card--' + product.color;

        const imageWrap = document.createElement('div');
        imageWrap.className = 'card-image';
        const img = document.createElement('img');
        img.src = 'images/' + product.image;
        img.alt = product.name;
        imageWrap.appendChild(img);

        const country = document.createElement('p');
        country.className = 'card-country';
        country.textContent = product.country;

        const name = document.createElement('h3');
        name.className = 'card-name';
        name.textContent = product.name;

        card.append(imageWrap, country, name);
        return card;
    }

    products.forEach((product) => track.appendChild(createCard(product)));
    const originals = Array.from(track.children);

    function cloneCard(card) {
        const copy = card.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        copy.dataset.clone = 'true';
        return copy;
    }

    function build() {
        track.querySelectorAll('[data-clone]').forEach((el) => el.remove());
        track.classList.remove('is-animated');

        if (reduceMotion.matches) return;

        // Make the first half at least as wide as the viewport
        const setWidth = track.getBoundingClientRect().width;
        const copies = Math.max(1, Math.ceil(window.innerWidth / setWidth));
        for (let i = 1; i < copies; i++) {
            originals.forEach((card) => track.appendChild(cloneCard(card)));
        }

        // Measure one half, then duplicate it to form the second half
        const halfWidth = track.getBoundingClientRect().width;
        Array.from(track.children).forEach((card) => track.appendChild(cloneCard(card)));

        track.style.setProperty('--scroll-distance', halfWidth + 'px');
        track.style.setProperty('--scroll-duration', halfWidth / PX_PER_SECOND + 's');
        track.classList.add('is-animated');
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 200);
    });
    reduceMotion.addEventListener('change', build);

    build();
})();