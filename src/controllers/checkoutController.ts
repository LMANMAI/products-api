import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP as string,
});

exports.createPreference = async (req: Request, res: Response) => {
  const { title, quantity, price, productID } = req.body;
  try {
    const body = {
      items: [
        {
          id: productID,
          title: title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/checkout",
        failure: "http://localhost:5173/checkout",
        pending: "http://localhost:5173/checkout",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });

    console.log(result, "result");
    console.log(preference, "preference");
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
