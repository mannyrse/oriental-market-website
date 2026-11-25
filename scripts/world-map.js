// International selection: map markers + product cards.
// Builds a marker and a chip for every entry in regions.js. Picking one
// (marker or chip) shows that country's products in the panel; picking it
// again, or "Show all", goes back to the mixed list.
(function () {
    const markersEl = document.querySelector('.map-markers');
    const chipsEl = document.querySelector('.region-chips');
    const cardsEl = document.querySelector('.world-cards');
    const panelEl = document.querySelector('.world-panel');
    const titleEl = document.querySelector('.world-panel__title');
    const hintEl = document.querySelector('.world-panel__hint');
    const resetBtn = document.querySelector('.world-panel__reset');
    if (!markersEl || !chipsEl || !cardsEl || typeof regions === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stacked = window.matchMedia('(max-width: 900px)');

    const markerButtons = new Map();
    const chipButtons = new Map();
    let selectedId = null;

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    // Position as a percentage of the map. Matches the SVG: lon -95..155, lat 78..-62.
    function toPercent(lon, lat) {
        return { x: ((lon + 95) / 250) * 100, y: ((78 - lat) / 140) * 100 };
    }

    function createMarker(region) {
        const pos = toPercent(region.lon, region.lat);
        const marker = el('button', 'map-marker' + (region.label === 'left' ? ' map-marker--left' : ''));
        marker.type = 'button';
        marker.style.setProperty('--x', pos.x + '%');
        marker.style.setProperty('--y', pos.y + '%');
        marker.setAttribute('aria-pressed', 'false');
        marker.setAttribute('aria-label', region.name + ': show featured products');

        const label = el('span', 'map-marker__label', region.name);
        label.setAttribute('aria-hidden', 'true');
        marker.append(el('span', 'map-marker__dot'), label);

        marker.addEventListener('click', () => select(region.id));
        markerButtons.set(region.id, marker);
        return marker;
    }

    function createChip(region) {
        const item = el('li');
        const chip = el('button', 'region-chip', region.name);
        chip.type = 'button';
        chip.setAttribute('aria-pressed', 'false');
        chip.addEventListener('click', () => select(region.id));
        chipButtons.set(region.id, chip);
        item.appendChild(chip);
        return item;
    }

    function createCard(region, product, index) {
        const card = el('li', 'world-card world-card--' + region.color);
        card.style.setProperty('--i', index);

        const tile = el('div', 'world-card__tile');
        tile.setAttribute('aria-hidden', 'true');
        tile.append(el('strong', '', region.code), el('small', '', product.type));

        const text = el('div', 'world-card__text');
        text.append(el('span', 'world-card__country', region.name), el('span', 'world-card__name', product.name));

        card.append(tile, text);
        return card;
    }

    function render() {
        const region = regions.find((r) => r.id === selectedId);
        let entries = [];

        if (region) {
            entries = region.items.map((product) => ({ region, product }));
            titleEl.textContent = 'Favorites from ' + region.name;
        } else {
            regions.forEach((r) => {
                r.items.filter((p) => p.featured).forEach((product) => entries.push({ region: r, product }));
            });
            entries = entries.slice(0, 4);
            titleEl.textContent = 'A few shelf favorites';
        }

        hintEl.hidden = Boolean(region);
        resetBtn.hidden = !region;
        cardsEl.replaceChildren(...entries.map((e, i) => createCard(e.region, e.product, i)));

        [markerButtons, chipButtons].forEach((buttons) => {
            buttons.forEach((button, id) => {
                const active = id === selectedId;
                button.classList.toggle('is-active', active);
                button.setAttribute('aria-pressed', String(active));
            });
        });
    }

    function select(id) {
        selectedId = selectedId === id ? null : id;
        render();
        // When the cards sit below the map, make sure they're in view
        if (selectedId && stacked.matches) {
            panelEl.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'nearest' });
        }
    }

    regions.forEach((region) => {
        markersEl.appendChild(createMarker(region));
        chipsEl.appendChild(createChip(region));
    });
    resetBtn.addEventListener('click', () => {
        selectedId = null;
        render();
    });

    render();
})();