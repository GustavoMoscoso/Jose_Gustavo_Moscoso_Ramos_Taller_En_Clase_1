 // =============================
 // Referencias a elementos HTML
 // =============================

 // Campos de entrada
 const pelicula = document.getElementById("pelicula");
 const genero = document.getElementById("genero");
 const precio = document.getElementById("precio");
 const dias = document.getElementById("dias");
 const descuento = document.getElementById("descuento");

 // Botones
 const btnCalcular = document.getElementById("btnCalcular");
 const btnLimpiar = document.getElementById("btnLimpiar");

 // Elementos de visualización
 const vistaPelicula = document.getElementById("vistaPelicula");
 const mensaje = document.getElementById("mensaje");

 // Resultados
 const resultadoPelicula = document.getElementById("resultadoPelicula");
 const resultadoGenero = document.getElementById("resultadoGenero");
 const resultadoDias = document.getElementById("resultadoDias");
 const resultadoSubtotal = document.getElementById("resultadoSubtotal");
 const resultadoDescuento = document.getElementById("resultadoDescuento");
 const resultadoTotal = document.getElementById("resultadoTotal");

 // =============================
 // Constantes
 // =============================

 // Porcentaje fijo de descuento (10%)
 const PORCENTAJE_DESCUENTO = 0.10;

 // =============================
 // Eventos
 // =============================

 // Evento input: mostrar la pelicula mientras se escribe
 pelicula.addEventListener("input", () => {
     if (pelicula.value.trim() === "") {
         vistaPelicula.textContent = "Ninguna";
     } else {
         vistaPelicula.textContent = pelicula.value;
     }
 });

 // Evento click: calcular alquiler
 btnCalcular.addEventListener("click", () => {
     calcularAlquiler();
 });

 // Evento click: limpiar formulario
 btnLimpiar.addEventListener("click", () => {
     limpiarFormulario();
 });

 // =============================
 // Funciones principales
 // =============================

 // Funcion principal: coordina el proceso de alquiler
 function calcularAlquiler() {

     // Obtener valores del formulario
     let tituloPelicula = pelicula.value.trim();
     let generoPelicula = genero.value;
     let precioDiario = Number(precio.value);
     let diasAlquiler = Number(dias.value);
     let aplicaDescuento = descuento.checked;

     // Validacion de datos
     if (validarDatos(tituloPelicula, generoPelicula,
                      precioDiario, diasAlquiler) === false) {
         mensaje.textContent = "Error: complete todos los datos correctamente.";
         return;
     }

     // Calculos del alquiler
     let subtotal = calcularSubtotal(precioDiario, diasAlquiler);
     let valorDescuento = calcularDescuento(subtotal, aplicaDescuento);
     let total = calcularTotal(subtotal, valorDescuento);

     // Crear objeto alquiler
     let alquiler = crearObjetoAlquiler(
         tituloPelicula,
         generoPelicula,
         diasAlquiler,
         subtotal,
         valorDescuento,
         total
     );

     // Mostrar resultados en pantalla
     mostrarResultado(alquiler);

     mensaje.textContent = "Alquiler calculado correctamente.";
 }

 // =============================
 // Funciones auxiliares
 // =============================

 // Validar datos del formulario
 function validarDatos(tituloPelicula, generoPelicula,
                       precioDiario, diasAlquiler) {

     if (tituloPelicula === "") {
         return false;
     }

     if (generoPelicula === "") {
         return false;
     }

     if (!Number.isFinite(precioDiario) || precioDiario <= 0) {
         return false;
     }

     if (!Number.isInteger(diasAlquiler) || diasAlquiler <= 0) {
         return false;
     }

     return true;
 }

 // Calcular subtotal del alquiler
 function calcularSubtotal(precioDiario, diasAlquiler) {
     return precioDiario * diasAlquiler;
 }

 // Calcular descuento
 function calcularDescuento(subtotal, aplicaDescuento) {
     if (aplicaDescuento === true) {
         return subtotal * PORCENTAJE_DESCUENTO;
     }

     return 0;
 }

 // Calcular total a pagar
 function calcularTotal(subtotal, valorDescuento) {
     return subtotal - valorDescuento;
 }

 // Crear objeto alquiler
 function crearObjetoAlquiler(tituloPelicula, generoPelicula,
                             diasAlquiler, subtotal,
                             valorDescuento, total) {

     let alquiler = {
         pelicula: tituloPelicula,
         genero: generoPelicula,
         dias: diasAlquiler,
         subtotal: subtotal,
         descuento: valorDescuento,
         total: total
     };

     return alquiler;
 }

 // Mostrar resultados en la interfaz
 function mostrarResultado(alquiler) {

     resultadoPelicula.textContent = alquiler.pelicula;
     resultadoGenero.textContent = alquiler.genero;
     resultadoDias.textContent = alquiler.dias;
     resultadoSubtotal.textContent = alquiler.subtotal.toFixed(2);
     resultadoDescuento.textContent = alquiler.descuento.toFixed(2);
     resultadoTotal.textContent = alquiler.total.toFixed(2);
 }

 // Limpiar todo el formulario y resultados
 function limpiarFormulario() {

     // Limpiar campos
     pelicula.value = "";
     genero.value = "";
     precio.value = "";
     dias.value = "";
     descuento.checked = false;

     // Restaurar vista previa
     vistaPelicula.textContent = "Ninguna";
     mensaje.textContent = "Ingrese los datos y calcule el alquiler.";

     // Limpiar resultados
     resultadoPelicula.textContent = "---";
     resultadoGenero.textContent = "---";
     resultadoDias.textContent = "0";
     resultadoSubtotal.textContent = "0.00";
     resultadoDescuento.textContent = "0.00";
     resultadoTotal.textContent = "0.00";
 }