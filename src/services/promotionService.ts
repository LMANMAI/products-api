import Promotion from "../models/promotionModel";
import Products from "../models/index";

async function findAllPromotions() {}

async function createNewPromotion(afectedProduct: any, discountAmount: number) {
  let products = await Products.find();
  //me traigo los productos
  if (afectedProduct) {
    const filters = Object.entries(afectedProduct);
    products = products.filter((sneaker: any) =>
      filters.every(([key, value]) => {
        if (typeof value === "string" && sneaker[key]) {
          return sneaker[key].toUpperCase().includes(value.toUpperCase());
        }
        return true;
      })
    );
  }
  //verifico como viene la variable para pisar las otras promociones en caso de que la nueva sea igual a una exiistente
  //modifico el precio de los productos y le asigno un valor que sea modified:true
  //guardo la promocion

  const newPromotion = new Promotion({
    afectedProduct,
    discountAmount,
  });

  // Guarda la nueva promoción en la base de datos
  const savedPromotion = await newPromotion.save();
  return savedPromotion;
}
async function deletePromotion() {}

module.exports = {
  findAllPromotions,
  createNewPromotion,
  deletePromotion,
};
