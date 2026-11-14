# Laboratorio Web | Jose Gustavo Moscoso Ramos

Portafolio academico de Desarrollo de Aplicaciones Web y Moviles, **ESPOL / SOFG1006**, 2026. Reune ejercicios de HTML, multimedia, CSS, frameworks y JavaScript bajo la identidad Nord & Deep Navy.

## Inicio y navegacion

- `index.html`: presentacion del autor, cuatro rutas de aprendizaje y un indice izquierdo con las 20 practicas disponibles. No incluye enlaces a Formulario2, Crazy ni TailWind_Black, que no existen.
- `pages/PracticaMenuHorizontal.html`: barra Bootstrap colapsable bajo 768 px, enlaces al inicio, menu vertical y secciones de la pagina.
- `pages/PracticaMenuVertical.html`: demostracion del mismo layout y controlador del inicio.
- `css/styleNavegacion.css`: estilos externos, grilla adaptable y ajustes acotados a `.bootstrap-site` para convivir con `styleGeneral.css`.
- `js/navegacion.js`: alterna la columna izquierda, sincroniza `hidden` y `aria-expanded`, y devuelve el foco al boton al cerrar con Escape.

El menu lateral ocupa una columna real de CSS Grid, nunca una capa superpuesta. En escritorio comienza abierto; en movil comienza cerrado y al abrir ocupa el 42 % del ancho. El boton permanece visible. El inicio ya no tiene recarga automatica.

La cabecera del inicio y de la practica vertical permanece visible al desplazarse. El panel lateral tiene desplazamiento propio limitado a la altura disponible de la pantalla, incluidos celulares en horizontal. Las cuatro tarjetas del inicio ofrecen acceso directo a las 20 practicas, no solo a un ejemplo de cada grupo. El portafolio WEB LAB presenta el trabajo academico; GGspolHUB es el subproyecto de comunidad enlazado desde la presentacion.

El menu horizontal conserva su posicion anclada. La altura real de cada barra se mide para que los destinos internos no queden ocultos; en movil el desplegable se cierra antes de desplazar al apartado y enfocar su encabezado. Se conserva exclusivamente el tema oscuro.

Estas mejoras se comprobaron en Edge a 320, 375, 768 y 1440 px, ademas de 667 x 375 px en horizontal: cabecera visible durante scroll, acceso al ultimo enlace del panel, ajuste real del contenido, coincidencia de los 20 destinos entre tarjetas y menu, y anclas del menu horizontal sin titulos tapados. La referencia externa original de CopyPaste sigue pendiente de confirmar; la pagina lo indica sin atribuir un origen no verificado.

## Dependencias y ejecucion

Bootstrap **5.3.3** se incluye localmente en `css/vendor/bootstrap.min.css` y `js/vendor/bootstrap.bundle.min.js`. El orden de estilos es Bootstrap, `styleGeneral.css` y `styleNavegacion.css`. No se requiere npm ni compilacion. El tema oscuro se declara mediante `data-bs-theme="dark"`.

Las paginas generales de practicas, incluida CopyPaste, utilizan Bootstrap y el tema compartido. AJAX ya no tiene un tema distinto para su cabecera o menu. CSS conserva todos sus ejemplos y solo adapta su navegacion, sin cargar Bootstrap; Tailwind conserva su framework. El subproyecto `GGspol_Frontend` conserva su implementacion y se corrigieron sus referencias a `css/styles.css`. La licencia de Bootstrap se incluye en `css/vendor/LICENSE.bootstrap.txt`.

## Menus de las practicas en movil

`css/styleMenuPracticas.css` y `js/menuPracticas.js` definen la navegacion compartida. Por debajo de 992 px, un boton muestra u oculta los enlaces en una columna, con areas tactiles de al menos 48 px. El menu comienza cerrado y ocupa espacio en el documento al abrirse: no tapa el contenido ni exige deslizamiento horizontal. Desde 992 px los enlaces quedan visibles. Escape cierra el menu y devuelve el foco al boton; los enlaces ocultos no reciben foco. Sin JavaScript, la lista sigue disponible.

El inicio y las demostraciones de menu horizontal/vertical conservan su comportamiento especifico. La practica Bootstrap mantiene su navbar colapsable, y los enlaces cortos de retorno de los dispositivos no se esconden innecesariamente.

Verificado con Edge y Playwright: 18 menus compartidos en 320, 375, 768, 991, 992 y 1440 px (108 combinaciones), con enlaces verticales en movil, apertura/cierre, Escape, foco y ausencia de desbordamiento. Tambien se comprobaron los cambios de breakpoint, el acceso sin JavaScript y el collapse de la practica Bootstrap. La hoja del menu no cambia los estilos calculados de los titulos, parrafos, cajas ni footer de la practica CSS.

Para recorrer el sitio completo, servir la raiz con un servidor HTTP estatico (por ejemplo, Live Server de VS Code) y abrir `/index.html`. Ajax necesita HTTP; abrir archivos con `file://` puede bloquear la lectura de JSON. La portada y ambos menus no necesitan Internet para cargar sus estilos, scripts o favicon.

Los recursos externos de algunas practicas, como sitios enlazados, Google Sites, videos incrustados o frameworks cargados desde CDN, **requieren Internet**. Las carpetas `img/`, `audio/` y `video/` contienen recursos locales; los ejercicios de audio y video utilizan clips de hasta 20 segundos.

## Pruebas de entrega

### Formulario GGspolHUB

`pages/PracticaFormulario.html` presenta una solicitud de participacion en torneos, desarrollo de videojuegos o modding y software libre. Su logica independiente esta en `js/PracticaFormulario.js`, con ajustes mobile-first en `css/styleFormulario.css`. Valida nombre, correo y preferencias, actualiza una vista previa del alias, genera un resumen de texto y permite limpiar el formulario. Modificar los datos oculta el resumen anterior hasta volver a validar.

Es una demostracion frontend: no envia solicitudes, no registra inscripciones ni almacena datos personales. `pages/PracticaJavaScript.html` conserva su ejercicio de alquiler y continua usando `js/JavaScript.js` sin cambios.

Verificado en Edge con Playwright a 320, 375, 768 y 1440 px: campos obligatorios y espacios vacios, correo invalido, vista previa del alias, resumen sin recarga, invalidacion del resumen al editar, limpieza, envio mediante Enter y texto con etiquetas HTML sin ejecucion. Sin JavaScript la validacion permanece deshabilitada y aparece un aviso. El menu movil sigue funcionando y el alquiler conserva su calculo con descuento.

Lista de comprobacion para ejecutar antes de publicar:

- Revisar inicio y ambos menus en 320, 375, 768 y 1440 px, sin desplazamiento horizontal.
- Abrir y cerrar el panel: el contenido debe cambiar de ancho, sin quedar cubierto. En movil el panel debe empezar cerrado.
- Recorrer con Tab; usar Enter y Espacio en el boton; pulsar Escape y comprobar que el foco regresa al control.
- Comprobar `aria-expanded` y que los enlaces del panel cerrado no reciben foco.
- En el menu horizontal, probar el boton Bootstrap bajo 768 px y los enlaces a secciones y paginas.
- Recorrer las 20 practicas desde el indice, comprobar rutas y revisar la consola del navegador.
- Probar Ajax desde HTTP y los recursos externos con Internet; desconectar la red para verificar que Bootstrap sigue disponible localmente.

### Verificacion realizada

Se ejecutaron pruebas automatizadas con Playwright y Microsoft Edge headless sobre HTTP local en las tres paginas de navegacion, a 320, 375, 768 y 1440 px. Resultado: sin desbordamiento horizontal; estado inicial correcto por dispositivo; cambio real del ancho de `main` al alternar el panel; columna movil inferior al 43 %; cierre con Escape y retorno del foco al boton; apertura y cierre del Collapse de Bootstrap sin errores JavaScript de pagina.

Tambien pasaron las comprobaciones de sintaxis de los scripts de ejercicios/navegacion y la revision de referencias locales de todos los HTML del proyecto. El indice contiene 20 enlaces de practicas. Se comprobaron en navegador la validacion, el calculo con descuento y la limpieza del alquiler en JavaScript, asi como la busqueda AJAX por HTTP. No se detectaron errores JavaScript ni desbordamiento de pagina a 375 px en las practicas revisadas. Los recursos externos y el despliegue requieren una comprobacion adicional con conexion. Las pistas WebVTT del ejercicio de video son ejemplos didacticos, no transcripciones del audio.

## Publicacion y entrega

1. Publicar la raiz del proyecto en un alojamiento estatico, conservando las rutas y sus mayusculas/minusculas. Se normalizaron en Git `index.html`, `pages/PracticaCss.html` y `pages/BootStrap/PracticaBootStrap.html` para evitar fallos en servidores sensibles a mayusculas.
2. Comprobar la URL publicada desde otro dispositivo, especialmente rutas anidadas, favicon, JSON y archivos de Bootstrap.
3. Crear un ZIP con `index.html`, `pages/`, `ia/`, `css/`, `js/`, `img/`, `audio/`, `video/` y los demas recursos utilizados. Excluir `.git/` y archivos temporales. Conservar la estructura de carpetas.
4. Adjuntar la grabacion del desarrollo que exige el PDF; puede dividirse en varios videos. Una demostracion final del inicio, los menus y la adaptacion movil puede complementar esa evidencia, pero no sustituye por si sola la grabacion del desarrollo.
5. Adjuntar el ZIP y registrar los enlaces reales de despliegue y grabacion en la entrega academica.

**URL de despliegue:** pendiente de publicacion por el autor.

**URL de grabacion:** pendiente de grabacion y publicacion por el autor.

No se incluyen enlaces ficticios ni se afirma haber generado un ZIP, desplegado el sitio o realizado una grabacion desde este repositorio.
