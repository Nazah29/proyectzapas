// ===============================
// CARGAR CATÁLOGO
// ===============================
window.productosGlobal = [];

window.renderProductos = function(productos) {
  const contenedorHigh = document.getElementById("catalogo-high");
  const contenedorLow = document.getElementById("catalogo-low");

  if (!contenedorHigh || !contenedorLow) return;

  contenedorHigh.innerHTML = "";
  contenedorLow.innerHTML = "";

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Verificar si es favorito (asumiendo que ya cargamos los favoritos del usuario)
    const esFavorito = window.favoritosActuales && window.favoritosActuales.includes(prod.id);
    const claseCorazon = esFavorito ? "bi-heart-fill activo" : "bi-heart";

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <button class="btn-favorito" data-id="${prod.id}">
        <i class="bi ${claseCorazon}"></i>
      </button>
    `;

    // Click en la imagen para abrir el modal
    card.querySelector("img").addEventListener("click", () => abrirModalProducto(prod));
    
    // Click en el corazón para favoritos
    card.querySelector(".btn-favorito").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorito(prod.id, card.querySelector(".btn-favorito i"));
    });

    if (prod.categoria === "HIGH") {
      contenedorHigh.appendChild(card);
    } else {
      contenedorLow.appendChild(card);
    }
  });
};

async function cargarCatalogo() {
  const { data, error } = await supabaseClient
    .from('productos')
    .select('*');

  if (error) {
    console.error("Error al cargar el catálogo:", error);
    return;
  }

  window.productosGlobal = data;
  
  // Cargar favoritos si hay usuario
  await cargarFavoritosLocales();

  window.renderProductos(window.productosGlobal);
}

// ===============================
// LÓGICA DE FAVORITOS (Avanzada)
// ===============================
window.favoritosActuales = [];

async function cargarFavoritosLocales() {
    const usuarioStr = localStorage.getItem("usuarioLogueado");
    if (!usuarioStr) return;
    
    try {
        const usuario = JSON.parse(usuarioStr);
        // Cuando crees la tabla favoritos, esto funcionará:
        const { data, error } = await supabaseClient
            .from("favoritos")
            .select("producto_id")
            .eq("usuario_id", usuario.id);
            
        if (!error && data) {
            window.favoritosActuales = data.map(f => f.producto_id);
        }
    } catch(e) {
        console.error("Error cargando favoritos", e);
    }
}

async function toggleFavorito(productoId, icono) {
    const usuarioStr = localStorage.getItem("usuarioLogueado");
    if (!usuarioStr) {
        if(window.mostrarToast) window.mostrarToast("Debes iniciar sesión para añadir a favoritos", "error");
        else alert("Debes iniciar sesión");
        return;
    }

    const usuario = JSON.parse(usuarioStr);
    const esFavorito = window.favoritosActuales.includes(productoId);

    try {
        if (esFavorito) {
            // Eliminar de favoritos
            await supabaseClient.from("favoritos")
                .delete()
                .eq("usuario_id", usuario.id)
                .eq("producto_id", productoId);
            
            window.favoritosActuales = window.favoritosActuales.filter(id => id !== productoId);
            icono.classList.replace("bi-heart-fill", "bi-heart");
            icono.classList.remove("activo");
            if(window.mostrarToast) window.mostrarToast("Eliminado de favoritos", "info");
        } else {
            // Añadir a favoritos
            await supabaseClient.from("favoritos").insert([
                { usuario_id: usuario.id, producto_id: productoId }
            ]);
            
            window.favoritosActuales.push(productoId);
            icono.classList.replace("bi-heart", "bi-heart-fill");
            icono.classList.add("activo");
            if(window.mostrarToast) window.mostrarToast("Añadido a favoritos ❤️", "success");
        }
    } catch (error) {
        console.error("Error en favoritos", error);
        if(window.mostrarToast) window.mostrarToast("Error de conexión", "error");
    }
}

// ===============================
// LÓGICA DE FILTROS AVANZADOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const filtroPrecio = document.getElementById("filtro-precio");
    const valorPrecio = document.getElementById("valor-precio");
    const btnLimpiar = document.getElementById("btn-limpiar-filtros");

    if (filtroPrecio && valorPrecio) {
        filtroPrecio.addEventListener("input", (e) => {
            const maxPrice = parseFloat(e.target.value);
            valorPrecio.textContent = maxPrice;
            
            const productosFiltrados = window.productosGlobal.filter(p => p.precio <= maxPrice);
            window.renderProductos(productosFiltrados);
        });
    }

    if (btnLimpiar && filtroPrecio) {
        btnLimpiar.addEventListener("click", () => {
            filtroPrecio.value = 1500;
            if(valorPrecio) valorPrecio.textContent = "1500";
            // Restablecer también el buscador si existe
            const inputBusqueda = document.getElementById("input-busqueda");
            if(inputBusqueda) inputBusqueda.value = "";
            
            window.renderProductos(window.productosGlobal);
        });
    }
});

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
  if (window.mostrarToast) {
    window.mostrarToast("Producto añadido al carrito", "success");
  } else {
    alert("Producto añadido al carrito");
  }
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