document.addEventListener("DOMContentLoaded", () => {
    const iconoCarrito = document.getElementById("icono-carrito");
    const carrito = document.getElementById("carrito");
    const cerrarCarrito = document.getElementById("cerrar-carrito");
    const btnAgregar = document.getElementById("btn-agregar-carrito");
    const carritoItems = document.getElementById("carrito-items");
    const carritoTotal = document.getElementById("carrito-total");
    const btnComprar = document.getElementById("btn-comprar");

    iconoCarrito.addEventListener("click", () => {
        carrito.classList.toggle("activo");
    });

    cerrarCarrito.addEventListener("click", () => {
        carrito.classList.remove("activo");
    });

    // Cargar carrito desde localStorage
    let itemsCarrito = JSON.parse(localStorage.getItem("itemsCarrito")) || [];

    function actualizarCarrito() {
        carritoItems.innerHTML = "";
        let total = 0;

        itemsCarrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("item-carrito");
            div.innerHTML = `
                <p>${item.nombre} - S/ ${item.precio}</p>
                <button class="eliminar-item" data-index="${index}">&times;</button>
            `;
            carritoItems.appendChild(div);

            total += item.precio;
        });

        carritoTotal.textContent = `S/ ${total}`;

        // Guardar en localStorage
        localStorage.setItem("itemsCarrito", JSON.stringify(itemsCarrito));

        const botonesEliminar = carritoItems.querySelectorAll(".eliminar-item");
        botonesEliminar.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                itemsCarrito.splice(index, 1);
                actualizarCarrito();
            });
        });
    }

    btnAgregar.addEventListener("click", () => {
        const item = {
            nombre: document.getElementById("modal-nombre").textContent || "Producto de prueba",
            precio: parseFloat(document.getElementById("modal-precio").textContent.replace("S/ ", "")) || 100
        };

        itemsCarrito.push(item);
        actualizarCarrito();
        carrito.classList.add("activo");
    });

    btnComprar.addEventListener("click", () => {
        if(itemsCarrito.length === 0){
            alert("El carrito está vacío");
            return;
        }
        alert("¡Compra realizada!");
        itemsCarrito = [];
        actualizarCarrito();
        carrito.classList.remove("activo");
    });

    // Inicializar carrito al cargar la página
    actualizarCarrito();
});
