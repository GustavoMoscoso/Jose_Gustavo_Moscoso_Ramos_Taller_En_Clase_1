// Catálogos Base (Módulo M02)
const catalogos = {
    facultades: [
        { id: 1, siglas: "FIEC", nombre: "Facultad de Ingeniería en Electricidad y Computación" },
        { id: 2, siglas: "FADCOM", nombre: "Facultad de Arte, Diseño y Comunicación Audiovisual" },
        { id: 3, siglas: "FIMCP", nombre: "Facultad de Ingeniería en Mecánica y Ciencias de la Producción" }
    ],
    juegos: [
        { id: 1, nombre: "Super Smash Bros" },
        { id: 2, nombre: "Valorant" },
        { id: 3, nombre: "League of Legends" }
    ]
};

// Datos iniciales simulados para el historial y torneos
const datosIniciales = {
    torneos: [
        { id: 1, nombre: "Liga Interfacultades Primavera", juego: "Valorant", modalidad: "Grupal", estado: "Inscripciones" }
    ],
    historial: [
        { juego: "Super Smash Bros", facultad: "FIEC", victorias: 10 },
        { juego: "Super Smash Bros", facultad: "FADCOM", victorias: 4 },
        { juego: "Valorant", facultad: "FIMCP", victorias: 5 }
    ]
};