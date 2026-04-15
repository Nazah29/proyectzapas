// ===============================
// CARGAR CATÁLOGO
// ===============================
async function cargarCatalogo() {
  const { data, error } = await supabaseClient
    .from('productos')
    .select('*')

  if (error) {
    console.log(error)
    return
  }

  const contenedorHigh = document.getElementById("catalogo-high")
  const contenedorLow = document.getElementById("catalogo-low")

  contenedorHigh.innerHTML = ""
  contenedorLow.innerHTML = ""

  data.forEach(prod => {
    const card = document.createElement("div")
    card.classList.add("card")

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

    `

    card.addEventListener("click", () => abrirModalProducto(prod))

    if (prod.categoria === "HIGH") {
      contenedorHigh.appendChild(card)
    } else {
      contenedorLow.appendChild(card)
    }
  })
}

// ===============================
// CARGAR DETALLE
// ===============================
async function cargarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");

  if (!idProducto) return;

  const { data, error } = await supabaseClient
    .from('productos')
    .select('*')
    .eq('id', idProducto)
    .single();

  if (error || !data) {
    document.body.innerHTML = "<h1>Producto no encontrado</h1>";
    return;
  }

  document.getElementById("producto-nombre").textContent = data.nombre;
  document.getElementById("producto-imagen").src = data.imagen;
  document.getElementById("producto-descripcion").textContent = data.descripcion;
  document.getElementById("producto-color").textContent = data.color;
  document.getElementById("producto-tallas").textContent = data.tallas;
  document.getElementById("producto-precio").textContent = data.precio;
}

// ===============================
// MODAL
// ===============================
let productoActual = null;

function abrirModalProducto(prod) {
  document.getElementById("modal-img").src = prod.imagen;
  document.getElementById("modal-nombre").textContent = prod.nombre;
  document.getElementById("modal-precio").textContent = "S/ " + prod.precio;
  document.getElementById("modal-color").textContent = "Color: " + prod.color;
  document.getElementById("modal-tallas").textContent = "Tallas: " + prod.tallas;
  document.getElementById("modal-descripcion").textContent = prod.descripcion;

  document.getElementById("modal-producto").classList.add("activo");

  productoActual = prod;
}

// ===============================
// EVENTOS
// ===============================
document.getElementById("cerrar-modal").addEventListener("click", () => {
  document.getElementById("modal-producto").classList.remove("activo");
});

document.getElementById("modal-producto").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    document.getElementById("modal-producto").classList.remove("activo");
  }
});

document.getElementById("btn-agregar-carrito").addEventListener("click", () => {
  alert("Producto añadido al carrito");
});

// ===============================
// INICIO
// ===============================
cargarCatalogo()
cargarDetalle()

async function testConexion() {
  const { data, error } = await supabaseClient
    .from('productos')
    .select('*')

  if (error) {
    console.log("❌ Error conexión:", error)
  } else {
    console.log("✅ Conectado correctamente")
    console.log(data)
  }
}

testConexion()