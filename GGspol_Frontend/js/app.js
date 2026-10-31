document.addEventListener('DOMContentLoaded', () => {
    inicializarSistema();
    renderizarEstadisticas();
    renderizarTorneos();
    llenarSelectJuegos();

    // Evento para crear torneo
    document.getElementById('form-crear-torneo').addEventListener('submit', (e) => {
        e.preventDefault();
        crearTorneo();
    });
});

function inicializarSistema() {
    // Si no existen datos en localStorage, cargamos los datos iniciales de datos.js
    if (!localStorage.getItem('ggspol_torneos')) {
        localStorage.setItem('ggspol_torneos', JSON.stringify(datosIniciales.torneos));
    }
    if (!localStorage.getItem('ggspol_historial')) {
        localStorage.setItem('ggspol_historial', JSON.stringify(datosIniciales.historial));
    }
}

function llenarSelectJuegos() {
    const select = document.getElementById('juegoTorneo');
    catalogos.juegos.forEach(juego => {
        const option = document.createElement('option');
        option.value = juego.nombre;
        option.textContent = juego.nombre;
        select.appendChild(option);
    });
}

function renderizarEstadisticas() {
    const contenedor = document.getElementById('contenedor-estadisticas');
    const historial = JSON.parse(localStorage.getItem('ggspol_historial'));
    
    contenedor.innerHTML = '';
    
    // Agrupamos visualmente por juego de forma sencilla
    catalogos.juegos.forEach(juego => {
        const statsJuego = historial.filter(h => h.juego === juego.nombre);
        if(statsJuego.length > 0) {
            let htmlList = '<ul class="list-group list-group-flush">';
            statsJuego.forEach(s => {
                htmlList += `<li class="list-group-item d-flex justify-content-between align-items-center">
                                ${s.facultad}
                                <span class="badge bg-warning text-dark rounded-pill">${s.victorias} Victorias</span>
                             </li>`;
            });
            htmlList += '</ul>';

            contenedor.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-primary text-white font-weight-bold">
                            ${juego.nombre}
                        </div>
                        ${htmlList}
                    </div>
                </div>
            `;
        }
    });
}

function renderizarTorneos() {
    const tbody = document.getElementById('tabla-torneos');
    const torneos = JSON.parse(localStorage.getItem('ggspol_torneos'));
    
    tbody.innerHTML = '';
    torneos.forEach(torneo => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${torneo.nombre}</strong></td>
                <td>${torneo.juego}</td>
                <td>${torneo.modalidad}</td>
                <td><span class="badge bg-${torneo.estado === 'Inscripciones' ? 'success' : 'secondary'}">${torneo.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary">Ver / Editar</button>
                </td>
            </tr>
        `;
    });
}

function crearTorneo() {
    const nombre = document.getElementById('nombreTorneo').value;
    const juego = document.getElementById('juegoTorneo').value;
    const modalidad = document.getElementById('modalidadTorneo').value;
    
    const torneos = JSON.parse(localStorage.getItem('ggspol_torneos'));
    const nuevoTorneo = {
        id: Date.now(),
        nombre: nombre,
        juego: juego,
        modalidad: modalidad,
        estado: "Inscripciones"
    };
    
    torneos.push(nuevoTorneo);
    localStorage.setItem('ggspol_torneos', JSON.stringify(torneos));
    
    // Cerrar modal de Bootstrap
    const modalElement = document.getElementById('modalTorneo');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // Resetear form y recargar tabla
    document.getElementById('form-crear-torneo').reset();
    renderizarTorneos();
}