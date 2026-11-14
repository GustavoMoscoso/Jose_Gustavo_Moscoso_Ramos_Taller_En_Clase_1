const formularioHub = document.getElementById('formulario-hub');
const estadoHub = document.getElementById('estado-formulario');
const resumenHub = document.getElementById('resumen-solicitud');
const aliasHub = document.getElementById('alias');
const vistaAliasHub = document.getElementById('vista-alias');
const camposHub = [...formularioHub.querySelectorAll('input, select, textarea')];

// El envio es solo una demostracion local: no hay peticiones ni almacenamiento de datos.
formularioHub.noValidate = true;
document.getElementById('btn-validar').disabled = false;

function validarCamposHub() {
    const nombre = formularioHub.elements.nombre;
    nombre.setCustomValidity(nombre.value.trim().length < 3 ? 'Escribe tu nombre, con al menos 3 caracteres.' : '');
    if (formularioHub.classList.contains('was-validated')) {
        camposHub.forEach((campo) => campo.setAttribute('aria-invalid', String(!campo.validity.valid)));
    }
}

formularioHub.addEventListener('input', () => {
    vistaAliasHub.textContent = aliasHub.value.trim() || 'Tu alias aparecera aqui';
    validarCamposHub();
    if (!resumenHub.hidden) {
        resumenHub.hidden = true;
        estadoHub.className = 'alert alert-info';
        estadoHub.textContent = 'Modificaste los datos. Vuelve a validar para actualizar el resumen.';
    }
});

formularioHub.addEventListener('submit', (event) => {
    event.preventDefault();
    camposHub.forEach((campo) => { campo.value = campo.value.trim(); });
    formularioHub.classList.add('was-validated');
    validarCamposHub();
    if (!formularioHub.checkValidity()) {
        resumenHub.hidden = true;
        estadoHub.className = 'alert alert-danger';
        estadoHub.textContent = 'Revisa los campos indicados. Completa los datos obligatorios con un correo valido.';
        formularioHub.querySelector('input:invalid, select:invalid, textarea:invalid').focus();
        return;
    }

    const solicitud = {
        nombre: formularioHub.elements.nombre.value,
        correo: formularioHub.elements.correo.value,
        alias: aliasHub.value || 'Sin alias',
        area: formularioHub.elements.area.selectedOptions[0].textContent,
        actividad: formularioHub.elements.actividad.value,
        mensaje: formularioHub.elements.mensaje.value || 'Sin mensaje adicional'
    };
    // textContent muestra lo escrito como texto, nunca como HTML ejecutable.
    Object.entries(solicitud).forEach(([campo, valor]) => {
        document.getElementById(`resumen-${campo}`).textContent = valor;
    });
    resumenHub.hidden = false;
    estadoHub.className = 'alert alert-success';
    estadoHub.textContent = 'Datos validados. Este resumen es una demostracion: no se ha enviado ni registrado una inscripcion.';
});

formularioHub.addEventListener('reset', () => {
    formularioHub.classList.remove('was-validated');
    camposHub.forEach((campo) => {
        campo.setCustomValidity('');
        campo.removeAttribute('aria-invalid');
    });
    resumenHub.hidden = true;
    resumenHub.querySelectorAll('dd').forEach((dato) => { dato.textContent = ''; });
    vistaAliasHub.textContent = 'Tu alias aparecera aqui';
    estadoHub.className = 'alert alert-info';
    estadoHub.textContent = 'Formulario limpio. Completa tus datos para generar una nueva vista previa.';
});
