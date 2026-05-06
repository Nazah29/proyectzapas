const inputBusqueda = document.getElementById("input-busqueda");
const icono = document.getElementById("icono-buscar");
const mensajeVacio = document.getElementById("mensaje-vacio");

// abrir buscador
if (icono && inputBusqueda) {
  icono.addEventListener("click", () => {
    inputBusqueda.classList.toggle("activo");
    inputBusqueda.focus();
  });
}

// normalizar texto (quitar acentos y mayúsculas)
function normalizarTexto(t) {
  if (!t) return "";
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// función principal de filtro
function filtrarProductos() {
  const textoB = normalizarTexto(inputBusqueda?.value || "");

  // Nos aseguramos de que existan productos en la memoria global
  const productos = window.productosGlobal || [];

  let filtrados = productos.filter(p => {
    let nombre = normalizarTexto(p.nombre);
    let color = normalizarTexto(p.color || "");

    return (
      textoB === "" || 
      nombre.includes(textoB) || 
      color.includes(textoB) // Permite buscar también por color escribiéndolo
    );
  });

  if (mensajeVacio) {
    mensajeVacio.style.display = filtrados.length === 0 ? "block" : "none";
  }

  // Usar la función global para volver a pintar las zapatillas
  if (window.renderProductos) {
    window.renderProductos(filtrados);
  }
}

// eventos
if (inputBusqueda) {
  inputBusqueda.addEventListener("input", filtrarProductos);
}