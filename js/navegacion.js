// La altura real de la barra evita tapar destinos al navegar por anclas o con zoom.
const stickyBar = document.querySelector('.sidebar-toolbar, .demo-navbar');
if (stickyBar) {
    const updateOffset = () => document.documentElement.style.setProperty('--sticky-offset', `${stickyBar.getBoundingClientRect().height}px`);
    updateOffset();
    new ResizeObserver(updateOffset).observe(stickyBar);
}

/* El panel ocupa una columna real, nunca una capa sobre el contenido. */
document.querySelectorAll('[data-sidebar-toggle]').forEach((button) => {
    const sidebar = document.getElementById(button.getAttribute('aria-controls'));
    const layout = document.querySelector('[data-sidebar-layout]');
    if (!sidebar || !layout) return;

    const mobile = window.matchMedia('(max-width: 767.98px)');
    const setOpen = (open) => {
        if (!open && sidebar.contains(document.activeElement)) button.focus();
        sidebar.hidden = !open;
        layout.classList.toggle('sidebar-closed', !open);
        button.setAttribute('aria-expanded', String(open));
    };

    setOpen(!mobile.matches);
    button.addEventListener('click', () => setOpen(sidebar.hidden));
    mobile.addEventListener('change', (event) => setOpen(!event.matches));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !sidebar.hidden) {
            setOpen(false);
            button.focus();
        }
    });
});

const horizontalMenu = document.getElementById('menuHorizontal');
if (horizontalMenu) {
    horizontalMenu.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link || !window.matchMedia('(max-width: 767.98px)').matches) return;
        const target = document.getElementById(link.hash.slice(1));
        if (!target || !horizontalMenu.classList.contains('show')) return;

        // Esperar a que cierre Collapse antes de calcular la posicion de la seccion.
        event.preventDefault();
        horizontalMenu.addEventListener('hidden.bs.collapse', () => {
            document.documentElement.style.setProperty('--sticky-offset', `${stickyBar.getBoundingClientRect().height}px`);
            history.pushState(null, '', link.hash);
            target.scrollIntoView();
            const heading = target.querySelector('h2') || target;
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
        }, { once: true });
        bootstrap.Collapse.getOrCreateInstance(horizontalMenu, { toggle: false }).hide();
    });
}
