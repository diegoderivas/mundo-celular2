/* Acceso al DOM */
const productos = document.getElementById("productos");
const botonCarrito = document.getElementById("botonCarrito");
const numeroCarrito = document.getElementById("numeroCarrito");
const contenidoCarrito = document.getElementById("contenidoCarrito");
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");

/* Acceso al localStorage */
let numeroCarritoStorage = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage")) || [];

/* Inicialización del carrito */
numeroCarritoStorage? numeroCarrito.innerHTML = numeroCarritoStorage : numeroCarrito.innerHTML = 0;

parseInt(numeroCarrito.innerHTML) === 0 ? contenidoCarrito.innerHTML = `<h3>Su carrito está vacío</h3>` : renderizarCarrito();

if (parseInt(numeroCarrito.innerHTML) === 0){
  botonVaciarCarrito.style.display = "none";
}

/* Renderizado de celulares */
celulares.forEach(item => {
  let article = document.createElement("article");
  article.innerHTML = `
  <div class="card text-center m-3" style="width: 18rem;">
    <img src="${item.imagen}" class="card-img-top imgCelular mt-3" alt="${item.marca} ${item.modelo}">
    <div class="card-body">
      <h5 class="card-title">${item.marca} ${item.modelo}</h5>
      <h5>US$${item.precio}</h5>
      <button type="button" id="${item.id}" class="btn btn-primary">Agregar al carrito</button>
    </div>
  </div>
  `
  productos.append(article);
  let botonAgregarACarrito = document.getElementById(item.id);
  botonAgregarACarrito.addEventListener("click", () => agregarACarrito(item));
})

/* Evento vaciar carrito */
botonVaciarCarrito.addEventListener("click",vaciarCarrito);
