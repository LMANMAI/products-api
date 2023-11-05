import * as mongoose from "mongoose";
require("dotenv").config({ path: ".env" });

export class myDB {
  public static async initDB() {
    if (!process.env.DB_URL) {
      throw new Error("La variable de entorno DB no está definida.");
    } else {
      console.log(
        "La variable de entorno esta definida correctamente,la conección con la base de datos esta en proceso"
      );
      return mongoose.connect(process.env.DB_URL);
    }
  }
  public static async closeCon() {
    return mongoose.connection.close(true);
  }
}
