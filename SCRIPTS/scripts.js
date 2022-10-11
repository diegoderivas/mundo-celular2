/* Acceso al localStorage */
let numeroCarritoStorage = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage")) || [];

/* Inicialización del carrito */
numeroCarritoStorage ? numeroCarrito.innerHTML = numeroCarritoStorage : numeroCarrito.innerHTML = 0;

renderizarCarrito();

if (parseInt(numeroCarrito.innerHTML) === 0) {
  botonVaciarCarrito.style.display = "none";
}

/* Renderizado de celulares */
renderizarProductos(celulares);
renderizarUltimosProductos(celulares);

/* Evento vaciar carrito */
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

/* Buscador */
botonBuscador.addEventListener("click", () => buscarProductos(formBuscador.value.toLowerCase()));

formBuscador.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    buscarProductos(formBuscador.value.toLowerCase());
  }
});

/* Ordenador */
ordenador?.addEventListener("change",() => ordenarProductos(celulares,ordenador.value));