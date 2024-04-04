import Product from "../models";
import { deleteImage } from "../cloudinary";
// Función para encontrar todos los Products con opciones de paginación
async function findAllProducts() {
  const products = await Product.find();
  return products;
}
// Función para encontrar todos los Products con filtros
async function findAllproductsWithFilter(searchParams: any) {
  let products = await Product.find();
  if (searchParams && searchParams.name) {
    products = products.filter((product: any) =>
      product.name.includes(searchParams.name)
    );
  }
  if (searchParams && searchParams.genre) {
    products = products.filter((product: any) =>
      product.genre.toUpperCase().includes(searchParams.genre)
    );
  }
  if (searchParams && searchParams.brand) {
    products = products.filter((product: any) =>
      product.brand.toUpperCase().includes(searchParams.brand)
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
  const totalQty = productData.sizes.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + parseInt(currentValue.qty),
    0
  );

  const newProduct = new Product({
    ...productData,
    quantity: totalQty,
    posterPathImage: image,
  });

  const savedProduct = await newProduct.save();
  return savedProduct;
}
// Función para actualizar un Product por su ID
async function updateProduct(productID: string, productData: any) {
  const totalQty = productData.sizes.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + parseInt(currentValue.qty),
    0
  );

  const updatedProductData = {
    ...productData,
    quantity: totalQty,
  };

  const updatedProductDocument = await Product.findByIdAndUpdate(
    productID,
    updatedProductData,
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
        "Additional product images are limited to a maximum of 3."
      );
    }
  } else {
    throw new Error("Product not found");
  }
}

async function findLastProducts() {
  const products = await Product.find().sort({ _id: -1 });
  return products;
}

module.exports = {
  findAllProducts,
  findAllproductsWithFilter,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteImageProduct,
  putImagesOnProduct,
  updatePosterImage,
  findLastProducts,
};
