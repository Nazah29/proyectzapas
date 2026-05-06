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

    // Obtener el usuario logueado para crear una clave de carrito única
    const usuarioLogueadoStr = localStorage.getItem("usuarioLogueado");
    let cartKey = "itemsCarrito_invitado"; // Carrito por defecto para no logueados

    if (usuarioLogueadoStr) {
        try {
            const usuario = JSON.parse(usuarioLogueadoStr);
            if (usuario.id) {
                cartKey = `itemsCarrito_${usuario.id}`;
            } else if (usuario.email) {
                cartKey = `itemsCarrito_${usuario.email}`;
            }
        } catch (e) {
            console.error("Error parseando usuario", e);
        }
    }

    // Cargar carrito desde localStorage usando la clave dinámica
    let itemsCarrito = JSON.parse(localStorage.getItem(cartKey)) || [];

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

        // Guardar en localStorage usando la clave dinámica
        localStorage.setItem(cartKey, JSON.stringify(itemsCarrito));

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

    btnComprar.addEventListener("click", async () => {
        if(itemsCarrito.length === 0){
            if (window.mostrarToast) window.mostrarToast("El carrito está vacío", "error");
            else alert("El carrito está vacío");
            return;
        }

        const usuarioStr = localStorage.getItem("usuarioLogueado");
        
        // Si hay usuario logueado, intentar registrar el pedido en la DB
        if (usuarioStr && window.supabaseClient) {
            btnComprar.textContent = "Procesando...";
            btnComprar.disabled = true;
            try {
                const usuario = JSON.parse(usuarioStr);
                const totalPedido = itemsCarrito.reduce((acc, item) => acc + item.precio, 0);
                
                // Cuando crees la tabla 'pedidos', esto insertará la orden
                const { error } = await window.supabaseClient.from("pedidos").insert([
                    {
                        usuario_id: usuario.id,
                        total: totalPedido,
                        estado: 'Pendiente',
                        detalles: JSON.stringify(itemsCarrito)
                    }
                ]);
                
                if (error) {
                    console.error("Error guardando pedido:", error);
                }
            } catch(e) {
                console.error("Error en el proceso de compra", e);
            }
            btnComprar.textContent = "Comprar";
            btnComprar.disabled = false;
        }

        if (window.mostrarToast) window.mostrarToast("¡Compra realizada con éxito!", "success");
        else alert("¡Compra realizada!");

        itemsCarrito = [];
        actualizarCarrito();
        carrito.classList.remove("activo");
    });

    // Inicializar carrito al cargar la página
    actualizarCarrito();
});
