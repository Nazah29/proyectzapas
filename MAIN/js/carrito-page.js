document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalPrecio = document.getElementById("total-precio");
    const btnFinalizar = document.getElementById("btn-finalizar-compra");

    // Determinar la clave del carrito según el usuario
    const usuarioLogueadoStr = localStorage.getItem("usuarioLogueado");
    let cartKey = "itemsCarrito_invitado";

    if (usuarioLogueadoStr) {
        try {
            const usuario = JSON.parse(usuarioLogueadoStr);
            if (usuario.id) {
                cartKey = `itemsCarrito_${usuario.id}`;
            } else if (usuario.email) {
                cartKey = `itemsCarrito_${usuario.email}`;
            }
        } catch (e) {
            console.error("Error leyendo usuario", e);
        }
    }

    let itemsCarrito = JSON.parse(localStorage.getItem(cartKey)) || [];

    function renderizarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;

        if (itemsCarrito.length === 0) {
            listaCarrito.innerHTML = `<div class="empty-cart"><h3>Tu carrito está vacío</h3><p>Agrega algunos productos desde la tienda.</p></div>`;
            totalPrecio.textContent = "0.00";
            btnFinalizar.disabled = true;
            btnFinalizar.style.background = "#555";
            btnFinalizar.style.cursor = "not-allowed";
            return;
        }

        btnFinalizar.disabled = false;
        btnFinalizar.style.background = "#2ed573";
        btnFinalizar.style.cursor = "pointer";

        itemsCarrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            
            div.innerHTML = `
                <div>
                    <h4>${item.nombre}</h4>
                </div>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <span class="precio">S/ ${item.precio}</span>
                    <button class="btn-eliminar" data-index="${index}"><i class="bi bi-trash"></i> Eliminar</button>
                </div>
            `;
            listaCarrito.appendChild(div);

            total += parseFloat(item.precio) || 0;
        });

        totalPrecio.textContent = total.toFixed(2);

        // Eventos de eliminar
        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.currentTarget.getAttribute("data-index");
                itemsCarrito.splice(index, 1);
                localStorage.setItem(cartKey, JSON.stringify(itemsCarrito));
                renderizarCarrito();
            });
        });
    }

    btnFinalizar.addEventListener("click", () => {
        if (itemsCarrito.length > 0) {
            alert("¡Procesando pago! Gracias por tu compra.");
            itemsCarrito = [];
            localStorage.setItem(cartKey, JSON.stringify(itemsCarrito));
            renderizarCarrito();
        }
    });

    renderizarCarrito();
});
