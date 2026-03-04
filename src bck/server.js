const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const{sequelize} = require("./models");
const productosRoutes = require("./routes/productos");
const proveedoresRoutes = require("./routes/proveedores");
const iaRoutes = require("./routes/ia");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/ia", iaRoutes);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL (puerto 3306) exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
      console.log(`Endpoint IA General: POST http://localhost:${PORT}/ia/consulta`);
      console.log(`Parámetros: { question: string, tipo: 'productos' | 'proveedores' }`);
    });
  } catch (err) {
    console.error("Error al iniciar servidor:", err);
  }
}

start();
