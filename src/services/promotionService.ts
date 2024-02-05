import Promotion from "../models/promotionModel";

async function findAllPromotions() {}
async function createNewPromotion(afectedProduct: any, discountAmount: number) {
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
