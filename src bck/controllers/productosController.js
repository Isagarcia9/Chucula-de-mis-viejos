const {Producto, VistaProducto} = require('../models');

//get todos los productos GET/ productos
async function getProductos(req, res) {
    try{
        const productos = await VistaProducto.findAll();
        res.json(productos);   
    } catch(err){
        console.error("Error al obtener productos: ", err);
        res.status(500).json({ error: "Error al obtener productos" });
    }
} 

// get producto por id /GET / productos/:id
async function getProductosById(req, res) {
    try{
        const id= req.params.id;
        const producto = await VistaProducto.findOne({
            where: { producto_id: id },
        });

        if(!producto){
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
    } catch(err){
        console.error("Error al obtener producto por ID: ", err);
        res.status(500).json({ error: "Error al obtener producto por ID" });
    }
}

// post productos /POST / productos
async function createProducto(req, res) {
    try{
        const { prod_nombre, prod_descripcion, pro_nit } = req.body;

        const nuevoProducto = await Producto.create({
            prod_nombre,
            prod_descripcion,
            pro_nit,
        });
        res.status(201).json(nuevoProducto);
    } catch(err){
        console.error("Error al crear producto: ", err);
        res.status(500).json({ error: "Error al crear producto" });
    }
}

// put actualizar producto /PUT / productos/:id
async function updateProducto(req, res) {
    try{
        const id = req.params.id;
        const producto = await Producto.findByPk(id);

        if(!producto){
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const { prod_nombre, prod_descripcion, pro_nit } = req.body;

        await producto.update({
            prod_nombre : prod_nombre, 
            prod_descripcion : prod_descripcion,
            pro_nit : pro_nit,
        });
        res.json(producto);
    }catch(err){
        console.error("Error al actualizar producto: ", err);
        res.status(500).json({ error: "Error al actualizar producto"});
    }
}

//delete eliminar productos DELETE/products/:id
async function deleteProducto(req, res) {
  try {
    const filas = await Producto.destroy({
      where: { prod_id: req.params.id },
    });

    if (filas === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
}

module.exports = {
    getProductos,
    getProductosById,
    createProducto,
    updateProducto,
    deleteProducto,
};