import { SneakerModel } from "../models";
import { Application, Request, Response } from "express";
//crear producto
exports.createProduct = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo post funcionando");
};
//obtener las productos
exports.getAllProducts = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo GET funcionando");
};
exports.getAllProductsWithFilters = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo GET funcionando");
};
exports.getWithFilters = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo GET funcionando");
};
exports.getOne = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo GET funcionando");
};
exports.insertImagesOnProduct = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo post funcionando");
};
//editar proucto
exports.deleteProductImages = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo delete funcionando");
};
exports.updateProduct = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo put funcionando");
};
//eliminar producto
exports.deleteProduct = async (req: Request, res: Response) => {
  res.send("Ruta de verificacion de funcionamiento, metodo delete funcionando");
};
