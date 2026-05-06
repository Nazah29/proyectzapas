productos.forEach(prod => {

    const contenedor = document.getElementById(
        prod.categoria === "HIGH" ? "catalogo-high" : "catalogo-low"
    );

    const card = document.createElement("div"); 
    card.classList.add("item");
    card.style.cursor = "pointer";

    card.innerHTML = `
        <div class="img-box">
            <img src="${prod.imagen}" alt="${prod.nombre}">
        </div>
    `;

    card.addEventListener("click", () => abrirModalProducto(prod));

    contenedor.appendChild(card);
});
