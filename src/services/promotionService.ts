import PromotionModel from "../models/promotionModel";
import ProductModel from "../models/index";

async function updateProducts(products: any[], discountAmount: number) {
  // Modificar el precio de los productos y actualizar hasModifications
  const promises = products.map(async (product: any) => {
    const prevPrice = product.price;
    const discountedPrice = prevPrice - (prevPrice * discountAmount) / 100;

    // Actualizar el precio y hasModifications
    return ProductModel.findOneAndUpdate(
      { _id: product._id },
      {
        price: discountedPrice,
        hasModifications: {
          promotionActive: true,
          previosPrice: prevPrice,
          discountPercentage: discountAmount,
        },
      },
      { new: true }
    );
  });

  await Promise.all(promises);
}

async function findAllPromotions() {
  let currentPromotions = await PromotionModel.find();
  return {
    message: "Promotions currently available",
    currentPromotions,
    status: 200,
  };
}

async function createNewPromotion(
  afectedProduct: any,
  discountAmount: number,
  discountNameId: string,
  replaceExistedPromotion: boolean
) {
  let products = await ProductModel.find();
  const newPromotion = new PromotionModel({
    afectedProduct,
    discountNameId,
    discountAmount,
  });

  if (afectedProduct) {
    const filters = Object.entries(afectedProduct);
    products = products.filter((product: any) =>
      filters.every(([key, value]) => {
        if (typeof value === "string" && product[key]) {
          return product[key].toUpperCase().includes(value.toUpperCase());
        }
        return true;
      })
    );
  }

  //verifico como viene la variable para pisar las otras promociones en caso de que la nueva sea igual a una exiistente
  const existingPromotions = await PromotionModel.find();
  const isDuplicate = existingPromotions.some((promotion) => {
    return (
      promotion.afectedProduct.brand === afectedProduct.brand &&
      promotion.afectedProduct.genre === afectedProduct.genre
    );
  });

  if (isDuplicate) {
    if (replaceExistedPromotion) {
      const existingPromotion = await PromotionModel.findOneAndUpdate(
        {
          "afectedProduct.brand": afectedProduct.brand,
          "afectedProduct.genre": afectedProduct.genre,
        },
        { discountAmount: discountAmount },
        { new: true }
      );

      await updateProducts(products, discountAmount);
      return {
        message: "Promotion replaced correctly",
        existingPromotion,
        status: 200,
      };
    } else {
      return {
        message: "The promotion already exists and was not chosen to modify.",
      };
    }
  }
  // Modificar el precio de los productos y actualizar hasModifications
  await updateProducts(products, discountAmount);
  // Guarda la nueva promoción en la base de datos
  const savedPromotion = await newPromotion.save();
  return {
    message: "Promotion created correctly",
    savedPromotion,
    status: 200,
  };
}
async function deletePromotion(promotionId: string, afectedProduct: any) {
  let products = await ProductModel.find();

  if (afectedProduct) {
    const filters = Object.entries(afectedProduct);
    products = products.filter((product: any) =>
      filters.every(([key, value]) => {
        if (typeof value === "string" && product[key]) {
          return product[key].toUpperCase().includes(value.toUpperCase());
        }
        return true;
      })
    );
  }

  const promises = products.map(async (product: any) => {
    // Actualizar el precio y hasModifications
    return ProductModel.findOneAndUpdate(
      { _id: product._id },
      {
        price: product.hasModifications.previosPrice,
        hasModifications: {
          promotionActive: false,
          previosPrice: 0,
          discountPercentage: 0,
        },
      },
      { new: true }
    );
  });

  const res = await Promise.all(promises);
  if (res) {
    const previousItem = await PromotionModel.findByIdAndDelete(promotionId);
    if (previousItem) {
      return { message: "Promotion removed correctly", status: 200 };
    } else {
      return {
        message:
          "No promotion was found to delete, it may have been deleted previously",
      };
    }
  }
}

module.exports = {
  findAllPromotions,
  createNewPromotion,
  deletePromotion,
};
