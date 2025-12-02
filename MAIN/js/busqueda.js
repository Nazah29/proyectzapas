const inputBusqueda = document.getElementById("input-busqueda");
const icono = document.getElementById("icono-buscar");
const input = document.getElementById("input-busqueda");

icono.addEventListener("click", () => {
    input.classList.toggle("activo");
    input.focus();
});

// Evento para detectar lo que escribe el usuario
inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();

    // Limpiar catálogos antes de volver a llenarlos
    document.getElementById("catalogo-high").innerHTML = "";
    document.getElementById("catalogo-low").innerHTML = "";

    // Filtrar productos por nombre
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    // Volver a cargarlos
    filtrados.forEach(prod => {
        const contenedor = document.getElementById(
            prod.categoria === "HIGH" ? "catalogo-high" : "catalogo-low"
        );

        const card = document.createElement("a");
        card.classList.add("item");
        card.href = prod.link;

        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h4>${prod.nombre}</h4>
            <p>S/ ${prod.precio}</p>
        `;
        contenedor.appendChild(card);
    });
});

// ================================
//         NUEVOS FILTROS
// ================================

const filtroCategoria = document.getElementById("filtro-categoria");
const filtroColor = document.getElementById("filtro-color");
const precioMin = document.getElementById("precio-min");
const precioMax = document.getElementById("precio-max");
const mensajeVacio = document.getElementById("mensaje-vacio");
const autoCompleteBox = document.getElementById("autocomplete");

function normalizarTexto(t) {
    return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function filtrarProductos() {
    const textoB = normalizarTexto(inputBusqueda.value);
    const catB = filtroCategoria.value;
    const colB = filtroColor.value.toLowerCase();
    const min = precioMin.value ? parseInt(precioMin.value) : 0;
    const max = precioMax.value ? parseInt(precioMax.value) : Infinity;

    document.getElementById("catalogo-high").innerHTML = "";
    document.getElementById("catalogo-low").innerHTML = "";

    let filtrados = productos.filter(p => {

        let nombreNorm = normalizarTexto(p.nombre);
        let colorNorm = normalizarTexto(p.color);

        return (
            // Coincidencia normal o tolerante
            nombreNorm.includes(textoB) ||

            // Permitir errores
            nombreNorm.replace(/a/g, "á").includes(textoB)
        ) &&
        (catB === "" || p.categoria === catB) &&
        (colB === "" || colorNorm.includes(colB)) &&
        p.precio >= min &&
        p.precio <= max;
    });

    // Mostrar mensaje si no hay productos
    mensajeVacio.style.display = filtrados.length === 0 ? "block" : "none";

    filtrados.forEach(prod => {
        const contenedor = document.getElementById(
            prod.categoria === "HIGH" ? "catalogo-high" : "catalogo-low"
        );

        const card = document.createElement("a");
        card.classList.add("item");
        card.href = `/ModelosNike/detalle.html?id=${prod.id}`;

        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h4>${prod.nombre}</h4>
            <p>S/ ${prod.precio}</p>
        `;

        contenedor.appendChild(card);
    });
}

// Ejecutar filtros al cambiar cualquier campo
filtroCategoria.addEventListener("change", filtrarProductos);
filtroColor.addEventListener("change", filtrarProductos);
precioMin.addEventListener("input", filtrarProductos);
precioMax.addEventListener("input", filtrarProductos);
inputBusqueda.addEventListener("input", filtrarProductos);
