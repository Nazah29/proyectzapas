// ===============================
// UI GLOBALS (Toast & Menu)
// ===============================

// Función global para mostrar Toasts
window.mostrarToast = function(mensaje, tipo = 'success') {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${tipo}`;
    
    // Icono según el tipo
    const icon = tipo === 'success' ? '<i class="bi bi-check-circle-fill" style="color: #28a745; font-size: 20px;"></i>' : 
                 tipo === 'error' ? '<i class="bi bi-x-circle-fill" style="color: #dc3545; font-size: 20px;"></i>' : 
                 '<i class="bi bi-info-circle-fill" style="color: #17a2b8; font-size: 20px;"></i>';

    toast.innerHTML = `${icon} <span>${mensaje}</span>`;
    
    container.appendChild(toast);

    // Animación de entrada
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    // Remover después de 3.5 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400); // Esperar que termine la animación
    }, 3500);
};

// Menú Hamburguesa Responsive
document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const navLinks = document.getElementById("nav-links");

    if (btnMenu && navLinks) {
        btnMenu.addEventListener("click", () => {
            navLinks.classList.toggle("activo");
        });
    }

    // LOGICA DE LOGOUT
    const btnLogout = document.getElementById("btn-logout");
    const usuarioStr = localStorage.getItem("usuarioLogueado");

    if (usuarioStr) {
        try {
            const usuario = JSON.parse(usuarioStr);
            
            // Mostrar mensaje de bienvenida
            const msgBienvenida = document.getElementById("mensaje-bienvenida");
            if (msgBienvenida) {
                const nombreMostrar = usuario.nombre || usuario.email || "Usuario";
                msgBienvenida.textContent = `Hola, ${nombreMostrar}`;
                msgBienvenida.style.display = "flex";
                msgBienvenida.style.alignItems = "center";
            }

            // Mostrar botón si hay usuario logueado
            if (btnLogout) {
                btnLogout.style.display = "flex";
                
                btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioLogueado");
            // Opcionalmente borrar también otros datos como carritos
            // localStorage.removeItem("itemsCarrito_" + JSON.parse(usuarioStr).id);
            
            if (window.mostrarToast) {
                window.mostrarToast("Sesión cerrada correctamente", "info");
            }
            
            // Recargar página después de un momento
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
            }
        } catch(e) {
            console.error("Error al leer el usuario logueado", e);
        }
    }
});
