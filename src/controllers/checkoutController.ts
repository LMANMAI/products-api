import Product from "../models";
import PurchaseModel from "../models/purchaseItemModel";
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
        description: item.userID,
        picture_url: item.productItemPosterPath,
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
    if (notificationData.topic === "merchant_order") {
      const response = await fetch(notificationData.resource, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        console.log(res, "respuesta JSONN");
        if (res.status === "closed" && res.order_status === "paid") {
          const newPurchaseOrder = new PurchaseModel({
            userId: res.items[0].description,
            items: res.items,
            orderId: res.id,
          });
          const basketItems = res.items;
          for (const item of basketItems) {
            const product = await Product.findById(item.id);

            if (product) {
              product.sizes.forEach((size: any) => {
                if (size.size === item.size) {
                  size.qty -= item.quantity;
                }
              });

              await product.save();
            }
          }
          await newPurchaseOrder.save();
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error al procesar la notificación de Mercado Pago:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Product.find({ userId: userId });

    res.json({
      msg: `Ordenes realizadas por el usuario ${userId}`,
      status: 200,
      orders,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      msg: `Error al traer las ordenes del usurio: (${error.message})`,
    });
  }
};
