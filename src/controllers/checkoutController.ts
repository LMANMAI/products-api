import Product from "../models";
import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP as string,
});

exports.createPreference = async (req: Request, res: Response) => {
  try {
    const productsData = req.body.map((item: any) => {
      return {
        id: item.productID,
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "ARS",
      };
    });

    const body = {
      items: productsData,
      back_urls: {
        success: `${process.env.BACK_URL}postcheckout/-`,
        failure: `${process.env.BACK_URL}checkout`,
        pending: `${process.env.BACK_URL}checkout`,
      },
      auto_return: "approved",
      notification_url: `${process.env.NOTIFICACION_URL}getpayment_info`,
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ msg: `Error al crear la preferencia: (${error.message})` });
  }
};

exports.getPaymentInfo = async (req: Request, res: Response) => {
  try {
    const notificationData = req.body;
    console.log(notificationData);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al procesar la notificación de Mercado Pago:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.completeOrder = async (req: Request, res: Response) => {
  try {
    const basketItems = req.body.basket;
    for (const item of basketItems) {
      const product = await Product.findById(item._id);

      if (product) {
        product.sizes.forEach((size: any) => {
          if (size.size === item.size) {
            size.qty -= item.quantity;
          }
        });

        await product.save();
      }
    }

    res.json({ msg: "Productos descontados exitosamente", status: 200 });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ msg: `Error al completar la compra: (${error.message})` });
  }
};
