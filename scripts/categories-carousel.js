// Products grid.
// Builds a card for each entry in categories.js. Each card shows its list
// first, then swipes (or uses the arrows / dots) over to its photo(s).
(function () {
    const grid = document.querySelector('.category-grid');
    if (!grid || typeof categories === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const singleColumn = window.matchMedia('(max-width: 760px)');

    const CHEVRONS = {
        prev: '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        next: '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };

    const updaters = [];

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    // Arrows + dots for one card. Returns a function that syncs them to the scroll position.
    function addControls(viewport, slides, count) {
        const prev = el('button', 'category-arrow category-arrow--prev');
        const next = el('button', 'category-arrow category-arrow--next');
        prev.type = next.type = 'button';
        prev.setAttribute('aria-label', 'Previous');
        next.setAttribute('aria-label', 'Next');
        prev.innerHTML = CHEVRONS.prev;
        next.innerHTML = CHEVRONS.next;

        const dotsWrap = el('div', 'category-dots');
        const dots = [];
        for (let i = 0; i < count; i++) {
            const dot = el('button', 'category-dot');
            dot.type = 'button';
            dot.setAttribute('aria-label', i === 0 ? 'Show list' : 'Show photo ' + i);
            dot.addEventListener('click', () => goTo(i));
            dots.push(dot);
            dotsWrap.appendChild(dot);
        }

        viewport.append(prev, next, dotsWrap);

        function currentIndex() {
            const width = slides.clientWidth;
            return width ? Math.round(slides.scrollLeft / width) : 0;
        }

        function goTo(index) {
            const target = Math.max(0, Math.min(count - 1, index));
            slides.scrollTo({
                left: target * slides.clientWidth,
                behavior: reduceMotion.matches ? 'auto' : 'smooth'
            });
        }

        function update() {
            const index = currentIndex();
            dots.forEach((dot, n) => {
                dot.classList.toggle('is-active', n === index);
                if (n === index) dot.setAttribute('aria-current', 'true');
                else dot.removeAttribute('aria-current');
            });
            prev.disabled = index <= 0;
            next.disabled = index >= count - 1;
        }

        prev.addEventListener('click', () => goTo(currentIndex() - 1));
        next.addEventListener('click', () => goTo(currentIndex() + 1));

        let ticking = false;
        slides.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                update();
            });
        }, { passive: true });
        window.addEventListener('resize', update);

        update();
        return update;
    }

    function createCard(category) {
        const card = el('article', 'category-card category-card--' + category.color);
        const viewport = el('div', 'category-viewport');

        const slides = el('div', 'category-slides');
        slides.tabIndex = 0;
        slides.setAttribute('role', 'region');
        slides.setAttribute('aria-label', category.title);

        // Slides 2+: photos
        const images = category.images || [];
        images.forEach((file) => {
            const slide = el('div', 'category-slide category-slide--image');
            const img = el('img');
            img.src = 'images/products/' + file;
            img.alt = category.title;
            img.loading = 'lazy';
            slide.appendChild(img);
            slides.appendChild(slide);
        });

        // Slide 1: the list
        const listSlide = el('div', 'category-slide');
        const list = el('ul', 'category-list');
        list.dataset.columns = category.columns || 1;
        category.items.forEach((item) => list.appendChild(el('li', '', item)));
        listSlide.appendChild(list);
        slides.appendChild(listSlide);


        viewport.appendChild(slides);

        const title = el('div', 'category-title');
        title.appendChild(el('h3', '', category.title));
        if (category.note) title.appendChild(el('p', '', category.note));

        card.append(viewport, title);

        if (images.length) {
            updaters.push(addControls(viewport, slides, images.length + 1));
        }
        return card;
    }

    const cards = categories.map(createCard);

    // Desktop: two columns (cards alternate left/right, so heights can differ).
    // Mobile: one column in the same order as categories.js.
    function layout() {
        grid.replaceChildren();
        if (singleColumn.matches) {
            cards.forEach((card) => grid.appendChild(card));
        } else {
            const columns = [el('div', 'category-col'), el('div', 'category-col')];
            columns.forEach((col) => grid.appendChild(col));
            cards.forEach((card, i) => columns[i % 2].appendChild(card));
        }
        // Moving a card resets its scroll position, so re-sync the dots and arrows
        updaters.forEach((update) => update());
    }

    singleColumn.addEventListener('change', layout);
    layout();
})();