const inputBusqueda = document.getElementById("input-busqueda")
const icono = document.getElementById("icono-buscar")

// abrir buscador
if (icono && inputBusqueda) {
  icono.addEventListener("click", () => {
    inputBusqueda.classList.toggle("activo")
    inputBusqueda.focus()
  })
}

// normalizar texto
function normalizarTexto(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// búsqueda simple
if (inputBusqueda) {
  inputBusqueda.addEventListener("input", filtrarProductos)
}

// filtros
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroColor = document.getElementById("filtro-color");
const precioMin = document.getElementById("precio-min");
const precioMax = document.getElementById("precio-max");
const mensajeVacio = document.getElementById("mensaje-vacio");

// función principal de filtro
function filtrarProductos() {
  const textoB = normalizarTexto(inputBusqueda?.value || "")
  const catB = filtroCategoria?.value || ""
  const colB = normalizarTexto(filtroColor?.value || "")
  const min = precioMin?.value ? parseInt(precioMin.value) : 0
  const max = precioMax?.value ? parseInt(precioMax.value) : Infinity

  let filtrados = productosGlobal.filter(p => {
    let nombre = normalizarTexto(p.nombre)
    let color = normalizarTexto(p.color)

    return (
      (textoB === "" || nombre.includes(textoB)) &&
      (catB === "" || p.categoria === catB) &&
      (colB === "" || color.includes(colB)) &&
      p.precio >= min &&
      p.precio <= max
    )
  })

  if (mensajeVacio) {
    mensajeVacio.style.display = filtrados.length === 0 ? "block" : "none"
  }

  renderProductos(filtrados)
}

// eventos de filtros
filtroCategoria?.addEventListener("change", filtrarProductos)
filtroColor?.addEventListener("change", filtrarProductos)
precioMin?.addEventListener("input", filtrarProductos)
precioMax?.addEventListener("input", filtrarProductos)