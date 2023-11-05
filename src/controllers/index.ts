const sneakerService = require("../services");
import { Request, Response } from "express";
import { uploadFile, deleteImage } from "../cloudinary";

//crear producto
exports.createProduct = async (req: Request, res: Response) => {
  try {
    const { sneaker } = req.body;
    const image = req.file;
    const imageCloud = await uploadFile(image);
    const newSneaker = await sneakerService.createSneaker(
      sneaker,
      imageCloud.public_id
    );

    return res.status(200).json({
      message: "Sneaker created successfully",
      sneaker: newSneaker,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating sneaker", error: error.message });
  }
};
//obtener las productos
exports.getAllProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const sneakers = await sneakerService.findAllSneakers();
    const paginatedSneakers = sneakers.slice(startIndex, endIndex);
    const totalSneakers = sneakers.length;
    const totalPages = Math.ceil(totalSneakers / pageSize);

    res.status(200).json({
      message: "Sneakers obtenidos con éxito",
      data: paginatedSneakers,
      totalSneakers,
      totalPages,
      currenPage: page,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al obtener los sneakers",
      error: error.message,
    });
  }
};

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

    const sneakers = await sneakerService.findAllSneakersWithFilter(
      searchQuery
    );
    const paginatedSneakers = sneakers.slice(startIndex, endIndex);
    const totalSneakers = sneakers.length;
    const totalPages = Math.ceil(totalSneakers / pageSize);

    if (sneakers.length === 0) {
      res.status(200).json({
        message: "No sneakers found with the specified criteria",
        data: [],
        status: 204,
      });
    } else {
      res.status(200).json({
        message: "Sneakers bringing successfully",
        data: paginatedSneakers,
        totalSneakers,
        totalPages,
        currenPage: page,
        status: 200,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error bringing sneaker with the specified criteria",
      error: error.message,
      status: 500,
    });
  }
};
exports.getOne = async (req: Request, res: Response) => {
  try {
    const sneaker = await sneakerService.findSneakerById(req.params.sneakerID);
    if (!sneaker) throw "Sneaker doesn't exist";
    return res.status(200).json({ sneaker });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error bringing sneaker",
      error: error.message,
      status: 500,
    });
  }
};

exports.insertImagesOnProduct = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo post funcionando");
};

//editar proucto
exports.updateProduct = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo put funcionando");
};
//eliminar imagen
exports.deleteProductImage = async (req: Request, res: Response) => {
  const { sneakerID, imageID } = req.params;
  try {
    console.log(sneakerID, "sneakerID");
    console.log(imageID, "imageID");
    // const sneaker = await sneakerService.findSneakerById(req.params.sneakerID);
    // if (!sneaker) throw "Sneaker doesn't exist";
    // return res.status(200).json({ sneaker });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error bringing sneaker",
      error: error.message,
      status: 500,
    });
  }
};
//eliminar producto
exports.deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted_sneaker = await sneakerService.deleteSneaker(
      req.params.sneakerID
    );
    if (!deleted_sneaker)
      throw "Sneaker doesn't exists or already been deleted";
    res
      .status(200)
      .json({ message: "this was the sneaker deleted", deleted_sneaker });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error deleting sneaker", error: error });
  }
};
