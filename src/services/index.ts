import Product from "../models";
import { deleteImage } from "../cloudinary";
// Función para encontrar todos los Products con opciones de paginación
async function findAllProducts() {
  const products = await Product.find();
  return products;
}
// Función para encontrar todos los Products con filtros
async function findAllProductsWithFilter(filterDto: any) {
  let products = await Product.find();
  if (filterDto && filterDto.name) {
    products = products.filter((product: any) =>
      product.name.toUpperCase().includes(filterDto.name)
    );
  }
  if (filterDto && filterDto.genre) {
    products = products.filter((product: any) =>
      product.genre.toUpperCase().includes(filterDto.genre)
    );
  }
  if (filterDto && filterDto.brand) {
    products = products.filter((product: any) =>
      product.brand.toUpperCase().includes(filterDto.brand)
    );
  }
  return products;
}
// Función para encontrar un Product por su ID
async function findProductById(productID: string) {
  const product = await Product.findById(productID);
  return product;
}
// Función para crear un nuevo Product
async function createProduct(productData: any, image: Express.Multer.File) {
  const newProduct = new Product({
    ...JSON.parse(productData),
    posterPathImage: image,
  });

  const savedProduct = await newProduct.save();
  return savedProduct;
}
// Función para actualizar un Product por su ID
async function updateProduct(productID: string, productData: any) {
  const updatedProductDocument = await Product.findByIdAndUpdate(
    productID,
    productData,
    { new: true }
  );
  return updatedProductDocument;
}
async function updatePosterImage(productID: string, img: string) {
  const updatedProductDocument = await Product.findByIdAndUpdate(
    productID,
    { $set: { posterPathImage: img } },
    { new: true }
  );
  return updatedProductDocument;
}
// Función para eliminar un Product por su ID
async function deleteProduct(productID: string) {
  const previousItem = await Product.findById(productID);
  const productProduct = await Product.findByIdAndDelete(productID);

  if (productProduct && previousItem) {
    await deleteImage(previousItem.posterPathImage);
  }

  return productProduct;
}
async function deleteImageProduct(
  productID: string,
  imageID: string,
  type: string
) {
  if (type === "poster") {
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      { $set: { posterPathImage: "" } },
      { new: true }
    );

    if (updatedProduct) {
      await deleteImage(`sneaker/${imageID}`);
    }
    return updatedProduct;
  } else if (type === "image") {
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      { $pull: { imgs: `sneaker/${imageID}` } },
      { new: true }
    );

    if (updatedProduct) {
      await deleteImage(`sneaker/${imageID}`);
    }

    return updatedProduct;
  }
}
// Función para agregar imágenes a un Product por su ID
async function putImagesOnProduct(productID: any, images: any) {
  const product = await Product.findById(productID);
  if (product) {
    if (Array.isArray(images) && images.length <= 3) {
      const combinedImages = [...product.imgs, ...images].slice(0, 3);
      product.imgs = combinedImages;

      const updateditem = await product.save();
      return updateditem;
    } else {
      throw new Error(
        "Las imagenes adicionales del producto estan limitadas a un maximo de 3."
      );
    }
  } else {
    throw new Error("Producto no encontrado");
  }
}

module.exports = {
  findAllProducts,
  findAllProductsWithFilter,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteImageProduct,
  putImagesOnProduct,
  updatePosterImage,
};
