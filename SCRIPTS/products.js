/* Creación de Clases */
class Celular {
  constructor(id, marca, modelo, precio, imagen) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.imagen = imagen;
  }
}

/* Creación de celulares */
let celulares = [];

const cel1 = new Celular(1, "Huawei", "Mate 30 Pro", 799, "https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/1-huawei-mate-30-pro_bvplun.png");
const cel2 = new Celular(2, "Apple", "Iphone 13 Pro Max", 1200, "https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/2-iphone-13-pro-max_j1fcvp.png");
const cel3 = new Celular(3, "Motorola", "Edge 30 Ultra", 950, "https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/3-motorola-edge-30_ultra_mfucop.png");
const cel4 = new Celular(4, "Poco", "F4 GT", 450, "https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/4-poco-f4-gt_kabbzn.png");
const cel5 = new Celular(5, "Samsung", "Galaxy S22 Ultra", 1000, "https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/5-samsung-galaxy-S22-ultra_cwcw4l.png");
const cel6 = new Celular(6, "Xiaomi", "Mi 12", 700, "https://res.cloudinary.com/dsmpqr05e/image/upload/v1664456489/Mundo%20Celular/Celulares/6-xiaomi-mi-12_mn9fem.png");
const cel7 = new Celular(7, "Apple", "Iphone 14 Plus", 899, "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665320497/Mundo%20Celular/Celulares/7-apple-iphone-14-plus_sldfv8.png");
const cel8 = new Celular(8, "Samsung", "S21 FE", 400 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524266/Mundo%20Celular/Celulares/8-samsung-s21-fe-removebg-preview_hzetpg.png");
const cel9 = new Celular(9, "Samsung", "Z Fold 3", 1100 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524266/Mundo%20Celular/Celulares/9-samsung-z-fold-3-removebg-preview_m7gf2j.png");
const cel10 = new Celular(10, "Poco", "X4 Pro", 300 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524266/Mundo%20Celular/Celulares/10-poco-x4-pro-removebg-preview_d6ootw.png");
const cel11 = new Celular(11, "Poco", "M5S", 250 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524266/Mundo%20Celular/Celulares/11-poco-m5s_wuyztq.png");
const cel12 = new Celular(12, "Xiaomi", "12S Ultra", 850 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524973/Mundo%20Celular/Celulares/12-xiaomi-12s-ultra-removebg-preview_bl4hff.png");
const cel13 = new Celular(13, "Xiaomi", "12T Pro", 750 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524267/Mundo%20Celular/Celulares/13-xiaomi-12t-pro-removebg-preview_z0yne0.png");
const cel14 = new Celular(14, "Apple", "Iphone 14 Pro Max", 1350 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524269/Mundo%20Celular/Celulares/14-iphone-14-pro-max_e6phlm.png");
const cel15 = new Celular(15, "Huawei", "P50 Pro", 700 , "https://res.cloudinary.com/dsmpqr05e/image/upload/v1665524268/Mundo%20Celular/Celulares/15-huawei-p50-pro-removebg-preview_gf8auw.png");




celulares.push(cel1, cel2, cel3, cel4, cel5, cel6, cel7, cel8, cel9, cel10, cel11, cel12, cel13, cel14, cel15);
switch (ordenador?.value) {
  case "rec":
    celulares.sort((a, b) => b.id - a.id);
    break;
  case "mame":
    celulares.sort((a, b) => b.precio - a.precio);
    break;
  case "mema":
    celulares.sort((a, b) => a.precio - b.precio);
    break;
}