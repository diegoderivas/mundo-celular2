/* Renderizar Productos */
const renderizarProductos = (prods) => {
  prods.forEach(item => {
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
}


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
  Toastify({
    text: "Agregado al carrito",
    duration: 2000,
    close: true,
    gravity: "bottom",
    position: "left", 
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {}
  }).showToast();
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
  if (parseInt(numeroCarrito.innerHTML) != 0) {
    botonVaciarCarrito.style.display = "inline";
  }
  let totalCompra = document.createElement("div");
  let resultado = carritoStorage.reduce((acc, elem) => acc + elem.subtotal, 0);
  totalCompra.innerHTML = `<h5 class="fw-bold text-center">Total: US$${resultado} </h5>`
  contenidoCarrito.append(totalCompra);
}

/* Vaciar carrito */
const vaciarCarrito = () => {
  Swal.fire({
    title: 'Desea vaciar su carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciarlo',
    cancelButtonText: 'Cancelar',
    allowOutsideClick: () => {
      const popup = Swal.getPopup()
      popup.classList.remove('swal2-show')
      setTimeout(() => {
        popup.classList.add('animate__animated', 'animate__headShake')
      })
      setTimeout(() => {
        popup.classList.remove('animate__animated', 'animate__headShake')
      }, 500)
      return false
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '',
        'Su carrito ha sido vaciado',
        'success'
      )
      localStorage.removeItem("carritoStorage");
      localStorage.setItem("numeroCarritoStorage", 0)
      contenidoCarrito.innerHTML = `<h3>Su carrito está vacío</h3>`
      carritoStorage = [];
      numeroCarrito.innerHTML = 0;
      botonVaciarCarrito.style.display = "none";
    }
  })
}


/* Buscar Productos */
const buscarProductos = (prod) => {
  productos.innerHTML = "";
  let buscado = celulares.filter(cel => (`${cel.marca} ${cel.modelo}`).toLowerCase().includes(prod));
  renderizarProductos(buscado);
}

