const boton = document.getElementById("btnBuscar");
const inputCategoria = document.getElementById("categoria");
let totalConsultas = 0;

boton.addEventListener("click", buscarProductos);
inputCategoria.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    buscarProductos();
  }
});

function buscarProductos() {
  const categoriaIngresada = inputCategoria.value.trim().toLowerCase();
  const mensaje = document.getElementById("mensaje");
  const resultado = document.getElementById("resultado");
  const zonaAjax = document.getElementById("zonaAjax");
  const contadorConsultas = document.getElementById("contadorConsultas");

  resultado.innerHTML = "";
  mensaje.className = "fw-bold text-muted";
  mensaje.textContent = "";

  if (categoriaIngresada === "") {
    mensaje.className = "fw-bold text-danger";
    mensaje.textContent = "Escribe una categoría para buscar.";
    return;
  }

  totalConsultas++;
  contadorConsultas.textContent = totalConsultas;

  if (window.location.protocol === "file:") {
    mensaje.className = "fw-bold text-danger";
    mensaje.textContent = "Abre esta página desde un servidor web para consultar el catálogo; AJAX no funciona al abrir el archivo directamente.";
    return;
  }

  zonaAjax.classList.add("cargando");
  mensaje.className = "fw-bold text-primary";
  mensaje.textContent = "Cargando actividades de GGspol...";

  fetch("../js/PracticaAjax.json")
    .then(function(respuesta) {
      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}: ${respuesta.statusText}`);
      }
      return respuesta.json();
    })
    .then(function(productos) {
      const productosFiltrados = productos.filter(function(producto) {
        return producto.categoria === categoriaIngresada;
      });

      mostrarProductos(productosFiltrados);
    })
    .catch(function(error) {
      mensaje.className = "fw-bold text-danger";
      mensaje.textContent = "No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.";
      console.log("Error en la petición AJAX:", error);
    })
    .finally(function() {
      zonaAjax.classList.remove("cargando");
    });
}

function mostrarProductos(listaProductos) {
  const mensaje = document.getElementById("mensaje");
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  if (listaProductos.length === 0) {
    mensaje.className = "fw-bold text-warning";
    mensaje.textContent = "No hay resultados. Prueba con torneos, juegos o actividades.";
    return;
  }

  mensaje.className = "fw-bold text-success";
  mensaje.textContent = "Opciones encontradas: " + listaProductos.length;

  listaProductos.forEach(function(producto) {
    const columna = document.createElement("div");
    columna.className = "col-md-6";

    const estado = producto.disponible ? "Cupos disponibles" : "Sin cupos";
    const claseEstado = producto.disponible ? "text-success" : "text-danger";
    const claseTarjeta = producto.disponible ? "producto-card" : "producto-card no-disponible";
    const costo = producto.precio === 0 ? "Gratis" : "$" + producto.precio.toFixed(2);

    columna.innerHTML = `
      <div class="card h-100 ${claseTarjeta}">
        <img src="${producto.imagen}" class="card-img-top producto-img" alt="Imagen de ${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text mb-1">Categoría: ${producto.categoria}</p>
          <p class="card-text mb-1">Costo de participación: ${costo}</p>
          <p class="card-text fw-bold ${claseEstado}">${estado}</p>
        </div>
      </div>
    `;

    resultado.appendChild(columna);
  });
}
