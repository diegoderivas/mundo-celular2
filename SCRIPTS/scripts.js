/* Acceso al DOM */
const productos = document.getElementById("productos");
const botonCarrito = document.getElementById("botonCarrito");
const numeroCarrito = document.getElementById("numeroCarrito");
const contenidoCarrito = document.getElementById("contenidoCarrito");
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
const formBuscador = document.getElementById("formBuscador");
const botonBuscador = document.getElementById("botonBuscador");

/* Acceso al localStorage */
let numeroCarritoStorage = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage")) || [];

/* Inicialización del carrito */
numeroCarritoStorage ? numeroCarrito.innerHTML = numeroCarritoStorage : numeroCarrito.innerHTML = 0;

parseInt(numeroCarrito.innerHTML) === 0 ? contenidoCarrito.innerHTML = `<h3>Su carrito está vacío</h3>` : renderizarCarrito();

if (parseInt(numeroCarrito.innerHTML) === 0) {
  botonVaciarCarrito.style.display = "none";
}

/* Renderizado de celulares */
renderizarProductos(celulares);

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