// controllers/iaController.js
const OpenAI = require("openai");
const { VistaProducto, VistaProveedor } = require("../models");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function consultarIA(req, res) {
    try {
        const { question, tipo } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Falta el campo 'question'" });
        }

        if (!tipo || !["productos", "proveedores"].includes(tipo)) {
            return res.status(400).json({ error: "Tipo inválido. Usa 'productos' o 'proveedores'" });
        }

        let datos, contextoJSON, roleSystem;

        // Obtener datos según tipo
        if (tipo === "productos") {
            const productosBD = await VistaProducto.findAll();
            datos = productosBD.map((p) => ({
                idProducto: p.producto_id,
                nombreProducto: p.producto,
                descripcionProducto: p.descripcion,
                nombreProveedor: p.proveedor,
            }));
            contextoJSON = JSON.stringify(datos, null, 2);
            roleSystem = "Eres un asistente en español que responde exclusivamente preguntas sobre los productos de la base de datos chucula_mis_viejos. Debes usar solo la información del JSON que se te da.";
        } else {
            const proveedoresBD = await VistaProveedor.findAll();
            datos = proveedoresBD.map((p) => ({
                idProveedor: p.proveedor_id,
                nombreProveedor: p.proveedor,
                telefonoProveedor: p.telefono_proveedor,
            }));
            contextoJSON = JSON.stringify(datos, null, 2);
            roleSystem = "Eres un asistente en español que responde exclusivamente preguntas sobre los proveedores de la base de datos chucula_mis_viejos. Debes usar solo la información del JSON que se te da.";
        }

        // Llamar al modelo de OpenAI
        const response = await openai.responses.create({
            model: "gpt-4.1-mini",
            input: [
                {
                    role: "system",
                    content: roleSystem,
                },
                {
                    role: "user",
                    content:
                        `Pregunta del usuario: ${question}\n\n` +
                        `JSON de datos:\n${contextoJSON}`,
                },
            ],
        });

        const answer = response.output_text;

        res.json({
            answer,
            tipo,
            totalDatos: datos.length,
        });
    } catch (err) {
        console.error("Error en consultarIA:", err);
        res.status(500).json({
            error: "Error interno en la consulta IA",
            details: err.message,
        });
    }
}

module.exports = { consultarIA };
