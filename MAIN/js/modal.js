function abrirModal(prod) {
    document.getElementById("modal-imagen").src = prod.imagen;
    document.getElementById("modal-nombre").textContent = prod.nombre;
    document.getElementById("modal-precio").textContent = "S/ " + prod.precio;
    document.getElementById("modal-color").textContent = prod.color;
    document.getElementById("modal-tallas").textContent = "Tallas: " + prod.tallas;
    document.getElementById("modal-descripcion").textContent = prod.descripcion;

    document.getElementById("modal-producto").classList.add("activo");
}
document.getElementById("cerrar-modal").addEventListener("click", () => {
    document.getElementById("modal-producto").classList.remove("activo");
});
window.addEventListener("click", e => {
    if (e.target.id === "modal-producto") {
        document.getElementById("modal-producto").classList.remove("activo");
    }
});
