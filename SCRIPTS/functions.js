/* Renderizado de celulares */
const renderizarProductos = async () => {
  try {
    let results = await fetch("https://raw.githubusercontent.com/diegoderivas/mundo-celular/main/data/products.json");
    let data = await results.json();

    /* Buscador de productos */
    let dataBuscada = buscarProductos(data);

    /* Filtrado de productos por marca*/
    let marcas = filtrarCelularesMarca();
    let dataFiltradaMarca = [];
    if (marcas.length > 0) {
      marcas.forEach(marcaAFiltrar => {
        dataBuscada.forEach(cel => {
          if (cel.marca === marcaAFiltrar) {
            dataFiltradaMarca.push(cel);
          }
        })
      })
    } else {
      dataFiltradaMarca = dataBuscada;
    }

    /* Filtrado de celulares por precio */
    let dataFiltradaPrecio = filtrarCelularesPrecio(dataFiltradaMarca);

    ordenarProductos(dataFiltradaPrecio);
    if (dataFiltradaPrecio.length === 0) {
      productos.className = "col-lg text-center mt-3";
      productos.innerHTML = "<h2>No se han encontrado productos</h2>"
    } else {
      productos.innerHTML = "";
      productos.className = "p-0 mx-auto row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 col-lg"
      dataFiltradaPrecio.forEach(item => {
        let article = document.createElement("article");
        article.classList = "mx-auto"
        article.innerHTML = `
        <div class="tarjetaCelular card text-center my-3 mx-auto">
          <img src="${item.imagen}" class="imgCelular mt-3 mx-auto" alt="${item.marca} ${item.modelo}">
          <div class="card-body">
            <h5 class="card-title">${item.marca} ${item.modelo}</h5>
            <h5>US$${item.precio}</h5>
            <button type="button" id="${"btnAgregarCarrito" + item.id}" class="btn btn-primary">Agregar al carrito</button>
          </div>
        </div>
        `
        productos?.append(article);
        let botonAgregarACarrito = document.getElementById("btnAgregarCarrito" + item.id);
        botonAgregarACarrito?.addEventListener("click", () => agregarACarrito(item));
      })
    }
  } catch (error) {
    console.log(error);
  }
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
  localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage));
  localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) + 1));
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
    onClick: function () { }
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
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">${item.marca} ${item.modelo}</h5>
            <span>Precio: US$${item.precioUnitario}</span>
            <div class="d-flex align-items-center my-1">
              <span>Cantidad: ${item.cantidad}</span>
              <div>
                <button id="${"btnRestar" + item.id}" class="btn btn-outline-danger ms-2 rounded-5">-</button>
                <button id="${"btnSumar" + item.id}" class="btn btn-outline-success rounded-5">+</button>
              </div>
            </div>
            <span class="fw-bold">Subtotal: US$${item.subtotal}</span>
          </div>
        </div>
        <div class="col-md-1">
          <button id="${"btnQuitar" + item.id}" class="mt-3 btn btn-warning p-1 rounded-5"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
    `
    contenidoCarrito.append(article);
    let botonRestarItemCarrito = document.getElementById("btnRestar" + item.id);
    let botonSumarItemCarrito = document.getElementById("btnSumar" + item.id);
    let botonQuitarItemCarrito = document.getElementById("btnQuitar" + item.id);
    botonRestarItemCarrito.addEventListener("click", () => restarItemCarrito(item));
    botonSumarItemCarrito.addEventListener("click", () => sumarItemCarrito(item));
    botonQuitarItemCarrito.addEventListener("click", () => quitarItemCarrito(item));
  })
  if (parseInt(numeroCarrito.innerHTML) != 0) {
    botonVaciarCarrito.style.display = "inline";
  }
  let totalCompra = document.createElement("div");
  let resultado = carritoStorage.reduce((acc, elem) => acc + elem.subtotal, 0);
  totalCompra.innerHTML = `<h5 class="fw-bold text-center">Total: US$${resultado} </h5>`
  contenidoCarrito.append(totalCompra);
  if (carritoStorage.length === 0) {
    contenidoCarrito.innerHTML = "<h3>Su carrito está vacío</h3>";
    botonVaciarCarrito.style.display = "none";
  }
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


/* Buscador de productos*/
const buscarProductos = lista => {
  let prod = formBuscador.value.toLowerCase();
  let buscado = lista.filter(elem => (`${elem.marca} ${elem.modelo}`).toLowerCase().includes(prod))
  return buscado;
}


/* Ordenar productos */
const ordenarProductos = lista => {
  switch (ordenador.value) {
    case "rec":
      lista.sort((a, b) => b.id - a.id);
      break;
    case "mame":
      lista.sort((a, b) => b.precio - a.precio);
      break;
    case "mema":
      lista.sort((a, b) => a.precio - b.precio);
      break;
  }
  return lista;
}


/* Sumar Item Carrito*/
const sumarItemCarrito = (producto) => {
  producto.cantidad++;
  producto.subtotal += producto.precioUnitario;
  localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) + 1));
  localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage));
  numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
  renderizarCarrito();
}

/* Restar Item Carrito */
const restarItemCarrito = (producto) => {
  if (producto.cantidad > 1) {
    producto.cantidad--;
    producto.subtotal -= producto.precioUnitario;
    localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage));
    localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) - 1));
    numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
    renderizarCarrito();
  }
}

/* Quitar Item Carrito */
const quitarItemCarrito = (producto) => {
  let indice = carritoStorage.indexOf(producto);
  localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) - producto.cantidad));
  numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
  carritoStorage.splice(indice, 1);
  localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage));
  renderizarCarrito();
}

/* Renderizar últimos productos (solo para index.html) */
const renderizarUltimosProductos = async () => {
  try {
    let results = await fetch("https://raw.githubusercontent.com/diegoderivas/mundo-celular/main/data/products.json");
    let data = await results.json();
    let ultProds = [];
    for (let i = data.length - 1; i > data.length - 5; i--) {
      ultProds.push(data[i]);
    }
    ultProds.forEach(item => {
      let article = document.createElement("article");
      article.classList = "mx-auto"
      article.innerHTML = `
      <div class="tarjetaCelular card text-center my-3 mx-auto">
        <img src="${item.imagen}" class="imgCelular mt-3 mx-auto" alt="${item.marca} ${item.modelo}">
        <div class="card-body">
          <h5 class="card-title">${item.marca} ${item.modelo}</h5>
          <h5>US$${item.precio}</h5>
          <button type="button" id="${"btnAgregarCarrito" + item.id}" class="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
      `
      ultimosProductos?.append(article);
      let botonAgregarACarritoDos = document.getElementById("btnAgregarCarrito" + item.id);
      botonAgregarACarritoDos?.addEventListener("click", () => agregarACarrito(item));
    })
  } catch (error) {
    console.log(error);
  }
}

/* Renderizado de filtro por marca */
const renderizarFiltroPorMarca = async () => {
  let response = await fetch("https://raw.githubusercontent.com/diegoderivas/mundo-celular/main/data/products.json");
  let data = await response.json();
  let marcas = [];

  data.forEach(item => {
    let marcaExiste = marcas.find(marca => marca === item.marca);
    if (!marcaExiste) {
      marcas.push(item.marca);
      let div = document.createElement("div");
      div.className = "form-check"

      let input = document.createElement("input");
      input.className = "form-check-input checkboxMarca";
      input.value = "";
      input.type = "checkbox"
      input.name = item.marca;
      input.id = `marca${item.marca}`;

      let label = document.createElement("label");
      label.className = "form-check-label";
      label.setAttribute("for", `marca${item.marca}`);
      label.innerHTML = `${item.marca}`;

      div.append(input, label);
      filtroMarca.append(div);

      let botonFiltroMarca = document.getElementById(`marca${item.marca}`);
      botonFiltroMarca.addEventListener("change", () => renderizarProductos());
    }
  })
}

/* Filtro de celulares por marca */
const filtrarCelularesMarca = () => {
  let checkboxMarca = document.getElementsByClassName("checkboxMarca");
  let marcasFiltradas = [];
  for (let elemento of checkboxMarca) {
    if (elemento.checked) {
      marcasFiltradas.push(elemento.name);
    }
  }
  return marcasFiltradas;
}

/* Filtro de celulares por precio */
const filtrarCelularesPrecio = lista => {
  if (precioMin.value.length === 0 && precioMax.value.length === 0) {
    return lista
  } else {
    let filtrado = lista.filter(cel => (cel.precio >= precioMin.value) && (cel.precio <= precioMax.value));
    return filtrado;
  }
}

const reestablecerFiltros = () => {
  formBuscador.value = "";
  ordenador.innerHTML = `
  <option selected value="rec">Agregados recientemente</option>
  <option value="mame">Precio: mayor a menor</option>
  <option value="mema">Precio: menor a mayor</option>`
  filtroMarca.innerHTML = "";
  renderizarFiltroPorMarca();
  precioMin.value = "";
  precioMax.value = "";
  renderizarProductos();
}