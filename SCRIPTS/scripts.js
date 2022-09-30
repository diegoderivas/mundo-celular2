/* Acceso al DOM */
const productos = document.getElementById("productos");
const botonCarrito = document.getElementById("botonCarrito")

/* Creación de Clases */
class Celular {
  constructor(id,marca,modelo,precio,imagen){
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.precio	= precio;
    this.imagen = imagen;
  }
}

/* Creación de celulares */
const cel1 = new Celular (1,"Huawei","Mate 30 Pro",799,"https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/1-huawei-mate-30-pro_bvplun.png");
const cel2 = new Celular (2,"Apple","Iphone 13 Pro Max",1200,"https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/2-iphone-13-pro-max_j1fcvp.png");
const cel3 = new Celular (3,"Motorola","Edge 30 Ultra",950,"https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/3-motorola-edge-30_ultra_mfucop.png");
const cel4 = new Celular (4,"Poco","F4 GT",450,"https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/4-poco-f4-gt_kabbzn.png");
const cel5 = new Celular (5,"Samsung","Galaxy S22 Ultra",1000,"https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/5-samsung-galaxy-S22-ultra_cwcw4l.png");
const cel6 = new Celular (6,"Xiaomi","Mi 12",700,"https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/6-xiaomi-mi-12_mn9fem.png");


/* Creación de arreglos */
let celulares = [];
let carrito = [];

celulares.push(cel1,cel2,cel3,cel4,cel5,cel6);


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

/* Funciones */
const agregarACarrito = producto => {
  let productoExiste = carrito.find(item => item.id === producto.id);
  if (!productoExiste){
    carrito.push({
      id: producto.id,
      marca: producto.marca,
      modelo: producto.modelo,
      precioUnitario: producto.precio,
      cantidad: 1,
      subtotal: producto.precio,
    })
  } else{
    productoExiste.cantidad++;
    productoExiste.subtotal += productoExiste.precioUnitario;
  }
}

const mostrarCarrito = () =>{
  console.log(carrito);
  let totalCompra = carrito.reduce((acc,elem) => acc + elem.subtotal,0);
  console.log(`El total de su compra es US$${totalCompra}`);
}

/* Evento Mostrar Carrito */
botonCarrito.addEventListener("click",mostrarCarrito);