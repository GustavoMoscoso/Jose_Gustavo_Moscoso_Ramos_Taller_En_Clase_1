/* Sin JavaScript los enlaces permanecen disponibles; el plegado es una mejora progresiva. */
document.querySelectorAll('[data-practice-menu]').forEach((menu) => {
    const button = menu.querySelector('[data-practice-toggle]');
    const links = menu.querySelector('[data-practice-links]');
    if (!button || !links) return;

    const compact = window.matchMedia('(max-width: 991.98px)');
    const setOpen = (open) => {
        if (!open && links.contains(document.activeElement)) button.focus();
        links.hidden = !open;
        button.setAttribute('aria-expanded', String(open));
    };
    const syncViewport = () => {
        // Antes de ocultar un control enfocado, trasladar el foco a un enlace visible.
        if (!compact.matches && document.activeElement === button) {
            links.hidden = false;
            links.querySelector('a')?.focus();
        }
        button.hidden = !compact.matches;
        setOpen(!compact.matches);
    };

    syncViewport();
    compact.addEventListener('change', syncViewport);
    button.addEventListener('click', () => setOpen(links.hidden));
    menu.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && compact.matches && !links.hidden) {
            event.preventDefault();
            setOpen(false);
            button.focus();
        }
    });
    links.addEventListener('click', (event) => {
        if (compact.matches && event.target.closest('a[href]')) {
            setOpen(false);
        }
    });
});
