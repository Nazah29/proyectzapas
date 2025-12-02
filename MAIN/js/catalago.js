const productos = [
    // =======================
    //        JORDAN HIGH
    // =======================
    {
        id: "jordan_high_clasic",
        nombre: "Jordan High Clasic",
        precio: 100,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/Airjordan1.jpg",
        color: "Rojo/Negro",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Modelo clásico de corte alto con combinación de colores llamativa.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_bw",
        nombre: "Jordan High Black & White",
        precio: 850,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/AirJordan1RetroHighOGBlackWhite.jpg",
        color: "Blanco/Negro",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Air Jordan 1 Retro High OG ‘Black White’, diseño limpio y versátil en blanco y negro.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_metallic_gold",
        nombre: "Jordan High Black Metallic Gold",
        precio: 0,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/AirJordan1RetroHighOGBlackMetallicGold.jpg",
        color: "Negro/Dorado",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Acabado negro con detalles dorados metálicos para un look más elegante.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_royal_blue",
        nombre: "Jordan High Royal Blue",
        precio: 0,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/AIRJORDAN1RETROHIOGRAREAIRROYALBLUE.jpg",
        color: "Azul/Blanco/Negro",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Combinación clásica en azul royal, blanco y negro.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_celeste",
        nombre: "Jordan High Celeste",
        precio: 0,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/Jordanceleste.jpg",
        color: "Celeste/Blanco",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Tonos celestes suaves ideales para un estilo más fresco.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_dorado_blanco",
        nombre: "Jordan High Dorado Blanco",
        precio: 0,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/Jordandorado.jpg",
        color: "Blanco/Dorado",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Detalles dorados sobre base blanca para un acabado llamativo.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_marron",
        nombre: "Jordan High Marrón",
        precio: 0,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/Jordanmarron.jpg",
        color: "Marrón/Blanco",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Colores tierra que combinan con estilos casuales.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_retro",
        nombre: "Jordan High Retro",
        precio: 0,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/Jordanretro.jpg",
        color: "Multicolor",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Edición retro con un diseño inspirado en modelos clásicos.",
        categoria: "HIGH"
    },
    {
        id: "jordan_high_verde",
        nombre: "Jordan High Verde",
        precio: 0,
        imagen: "../ModelosNike/JordanHigh/NikeJordan/Jordanverde.jpg",
        color: "Verde/Blanco",
        tallas: "40, 41, 42, 43, 44",
        descripcion: "Tonos verdes ideales para destacar en cualquier outfit.",
        categoria: "HIGH"
    },

    // =======================
    //        JORDAN LOW
    // =======================
    {
        id: "jordan_low_bicolor",
        nombre: "Jordan Low Bicolor",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lowbicolor.avif",
        color: "Blanco/Negro",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Modelo low con contraste de dos tonos.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_blanca",
        nombre: "Jordan Low Blanca",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lowblanca.jpg",
        color: "Blanco",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Diseño limpio totalmente blanco, perfecto para el día a día.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_celeste",
        nombre: "Jordan Low Celeste",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lowceleste.webp",
        color: "Celeste/Blanco",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Zapatilla baja con tonos celestes suaves.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_colorida",
        nombre: "Jordan Low Colorida",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lowcolorida.webp",
        color: "Multicolor",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Combinación de colores vivos para un estilo más atrevido.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_naranja",
        nombre: "Jordan Low Naranja",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lownaranja.webp",
        color: "Naranja/Blanco",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Tonos naranjas que resaltan cualquier outfit urbano.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_normal",
        nombre: "Jordan Low Normal",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lownormal.webp",
        color: "Blanco/Negro",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Modelo low con diseño clásico y versátil.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_tutifruti",
        nombre: "Jordan Low Tutifruti",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lowtutifruti.jpeg",
        color: "Multicolor",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Paleta de colores llamativa estilo ‘tutifruti’.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_verde",
        nombre: "Jordan Low Verde",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lowverde.jpg",
        color: "Verde/Blanco",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Modelo low en tonos verdes para un look diferente.",
        categoria: "LOW"
    },
    {
        id: "jordan_low_verde_claro",
        nombre: "Jordan Low Verde Claro",
        precio: 0,
        imagen: "../ModelosNike/JordanLow/IMG/Lowverdemasclarito.webp",
        color: "Verde claro/Blanco",
        tallas: "39, 40, 41, 42, 43",
        descripcion: "Tonos verdes claros para un estilo más suave.",
        categoria: "LOW"
        
    }
];

// ===============================
//   CARGAR DETALLE DINÁMICO
// ===============================

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

if (idProducto) {
    const producto = productos.find(p => p.id === idProducto);

    if (producto) {
        document.getElementById("producto-nombre").textContent = producto.nombre;
        document.getElementById("producto-imagen").src = producto.imagen;
        document.getElementById("producto-descripcion").textContent = producto.descripcion;
        document.getElementById("producto-color").textContent = producto.color;
        document.getElementById("producto-tallas").textContent = producto.tallas;
        document.getElementById("producto-precio").textContent = producto.precio;
    } else {
        document.body.innerHTML = "<h1>Producto no encontrado</h1>";
    }
}

let productoActual = null; // esto guarda el actual , el producto

// Abrir modal
function abrirModalProducto(prod) {
    document.getElementById("modal-img").src = prod.imagen;
    document.getElementById("modal-nombre").textContent = prod.nombre;
    document.getElementById("modal-precio").textContent = "S/ " + prod.precio;
    document.getElementById("modal-color").textContent = "Color: " + prod.color;
    document.getElementById("modal-tallas").textContent = "Tallas: " + prod.tallas;
    document.getElementById("modal-descripcion").textContent = prod.descripcion;

    document.getElementById("btn-agregar-carrito").setAttribute("data-id", prod.id);

    document.getElementById("modal-producto").classList.add("activo");

        document.getElementById("modal-producto").classList.add("activo");

    // guardar producto actual para carrito
    if (window.__carrito && typeof window.__carrito.setProductoActual === "function") {
      window.__carrito.setProductoActual(prod);
    } else {
      // fallback local var
      productoActual = prod;
    }
}

// Cerrar modal
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

