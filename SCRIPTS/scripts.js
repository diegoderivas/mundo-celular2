/* Acceso al localStorage */
let numeroCarritoStorage = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage")) || [];

/* Inicialización del carrito */
numeroCarritoStorage ? numeroCarrito.innerHTML = numeroCarritoStorage : numeroCarrito.innerHTML = 0;

renderizarCarrito();

if (parseInt(numeroCarrito.innerHTML) === 0) {
  botonVaciarCarrito.style.display = "none";
}

/* Evento vaciar carrito */
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

/* Buscador */
botonBuscador?.addEventListener("click", () => renderizarProductos());

formBuscador?.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    renderizarProductos();
  }
});

/* Ordenador */
ordenador?.addEventListener("change",() => renderizarProductos());