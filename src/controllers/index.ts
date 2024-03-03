const productService = require("../services");
import { Request, Response } from "express";
import { uploadFile } from "../cloudinary";

//crear producto
exports.createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const image = req.file;
    const imageCloud = await uploadFile(image);
    const newProduct = await productService.createProduct(
      product,
      imageCloud.public_id
    );

    return res.status(200).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};
//obtener las productos
exports.getAllProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const products = await productService.findAllProducts();
    const paginatedproducts = products.slice(startIndex, endIndex);
    const totalproducts = products.length;
    const totalPages = Math.ceil(totalproducts / pageSize);

    res.status(200).json({
      message: "Products successfully obtained",
      data: paginatedproducts,
      totalproducts,
      totalPages,
      status: 200,
      currenPage: page,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error when obtaining the products",
      error: error.message,
    });
  }
};
//obtener las productos con filtros
exports.getAllProductsWithFilters = async (req: Request, res: Response) => {
  const { name, genre, brand } = req.query;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const searchQuery: any = {};

    if (name) {
      searchQuery.name = name;
    }
    if (genre) {
      searchQuery.genre = genre;
    }
    if (brand) {
      searchQuery.brand = brand;
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const products = await productService.findAllproductsWithFilter(
      searchQuery
    );
    const paginatedproducts = products.slice(startIndex, endIndex);
    const totalproducts = products.length;
    const totalPages = Math.ceil(totalproducts / pageSize);

    if (products.length === 0) {
      res.status(200).json({
        message: "No products found with the specified criteria",
        data: [],
        status: 204,
      });
    } else {
      res.status(200).json({
        message: "products bringing successfully",
        data: paginatedproducts,
        totalproducts,
        totalPages,
        currenPage: page,
        status: 200,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error bringing product with the specified criteria",
      error: error.message,
      status: 500,
    });
  }
};
//obtener producto con id
exports.getOne = async (req: Request, res: Response) => {
  try {
    const product = await productService.findProductById(req.params.productId);
    if (!product) throw new Error("Product doesn't exist");
    return res.status(200).json({ product });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error bringing product",
      error: error.message,
      status: 500,
    });
  }
};
//agregar imagenes al producto
exports.insertImagesOnProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const images = req.files as Express.Multer.File[];
    const uploadPromises = images.map(async (img: Express.Multer.File) => {
      const imageCloud = await uploadFile(img);
      return imageCloud.public_id;
    });

    const uploadedImageIds = await Promise.all(uploadPromises);
    const product = await productService.putImagesOnProduct(
      productId,
      uploadedImageIds
    );
    res.status(200).json({
      message: "Product updated correct",
      product,
      status: 200,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error updateding product", error: error.message });
  }
};
//editar proucto
exports.updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const newProduct = await productService.updateProduct(productId, req.body);
    if (!newProduct) throw new Error("Cannot update the product");
    res.status(200).json({
      message: "Product updated correct",
      newProduct,
      status: 200,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error updateding product", error: error.message });
  }
};
//eliminar imagen de un producto
exports.deleteProductImage = async (req: Request, res: Response) => {
  const { productId, imageID, type } = req.params;
  try {
    const product = await productService.deleteImageProduct(
      productId,
      imageID,
      type
    );
    if (!product) throw new Error("Product doesn't exist");
    return res.status(200).json({ product });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error bringing product",
      error: error.message,
      status: 500,
    });
  }
};
//eliminar producto
exports.deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await productService.deleteProduct(
      req.params.productId
    );
    if (!deletedProduct)
      throw new Error("Product doesn't exists or already been deleted");
    res.status(200).json({
      message: "this was the product deleted",
      deletedProduct,
      status: 200,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error deleting product", error: error });
  }
};
exports.updatePosterImage = async (req: Request, res: Response) => {
  try {
    const image = req.file;
    const { productId } = req.params;
    const imageCloud = await uploadFile(image);
    const request = await productService.updatePosterImage(
      productId,
      imageCloud.public_id
    );
    return res.status(200).json({
      message: "Product created successfully",
      sneaker: request,
      status: 200,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};
