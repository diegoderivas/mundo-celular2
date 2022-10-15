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
renderizarProductos();
renderizarUltimosProductos();

/* Evento vaciar carrito */
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

/* Buscador */
if(window.location.pathname === "/pages/products.html"){
  botonBuscador.addEventListener("click", () => buscarProductos(formBuscador.value.toLowerCase()));
}

if(window.location.pathname === "/pages/products.html"){
  formBuscador.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      buscarProductos(formBuscador.value.toLowerCase());
    }
  });
}

/* Ordenador */
ordenador?.addEventListener("change",() => ordenarProductos(ordenador.value));