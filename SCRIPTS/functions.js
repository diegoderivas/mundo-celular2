/* Agregar al carrito */
const agregarACarrito = producto => {
  let productoExiste = carritoStorage.find(item => item.id === producto.id);
  if (!productoExiste) {
    carritoStorage.push({
      id: producto.id,
      marca: producto.marca,
      modelo: producto.modelo,
      precioUnitario: producto.precio,
      cantidad: 1,
      subtotal: producto.precio,
      imagen: producto.imagen,
    })
  } else {
    productoExiste.cantidad++;
    productoExiste.subtotal += productoExiste.precioUnitario;
  }
  localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) + 1));
  localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage));
  numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
  renderizarCarrito();
}

/* Renderizar Carrito */
const renderizarCarrito = () => {
  contenidoCarrito.innerHTML = "";
  carritoStorage.forEach(item => {
    let article = document.createElement("article");
    article.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4 d-flex">
          <img src="${item.imagen}" class="img-fluid align-self-center" alt="${item.marca} ${item.modelo}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.marca} ${item.modelo}</h5>
            <p>Precio: US$${item.precioUnitario}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p class="fw-bold">Subtotal: US$${item.subtotal}</p>
          </div>
        </div>
      </div>
    </div>
    `
    contenidoCarrito.append(article);
  })
  let totalCompra = document.createElement("div");
  let resultado = carritoStorage.reduce((acc,elem) => acc + elem.subtotal,0);
  totalCompra.innerHTML = `<h5 class="fw-bold text-center">Total: US$${resultado} </h5>`
  contenidoCarrito.append(totalCompra);
}

/* Vaciar carrito */
const vaciarCarrito = () => {
  localStorage.removeItem("carritoStorage");
  localStorage.setItem("numeroCarritoStorage", 0)
  contenidoCarrito.innerHTML = `<h3>Su carrito está vacío</h3>`
  numeroCarrito.innerHTML = 0;
}
