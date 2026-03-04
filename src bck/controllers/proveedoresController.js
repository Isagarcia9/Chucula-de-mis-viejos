const {Proveedor, VistaProveedor} = require ('../models');

//get GET/proveedores 
async function getProveedores(req, res) {
    try{
        const proveedores = await VistaProveedor.findAll();
        res.json(proveedores); 
    }catch(err){
        console.error("Error al obtener proveedores:", err); 
        res.status(500).json({ error: "Error al obtener proveedores"});
    }
}

//get /GET/proveedores/:id

async function getProveedoresById(req,res) {
    try{
        const id= req.params.id;
        const proveedor = await VistaProveedor.findOne({
            where:{ proveedor_id: id},
        });

        if(!proveedor){
            return res.status(404).json({ error:"Proveedor no encontrado "});
        }
        res.json(proveedor);
    }catch(err){
        console.error("Error al obtener proveedor por ID: ", err);
        res.status(500).json({ error: "Error al obtener proveedor por ID" })
    }   
}


//post /POST/ proveedores  
async function createProveedores(req, res) {
    try {
        const { pro_nombre, pro_telefono } = req.body;

        const nuevoProveedor = await Proveedor.create({
            pro_nombre,
            pro_telefono,
        });

        res.status(201).json(nuevoProveedor);
    } catch (err) {
        console.error("Error al crear proveedor:", err);
        res.status(500).json({ error: "Error al crear proveedor" });
    }
}
//put /PUT/ proveedores/:id

async function updateProveedores(req,res) {
    try{
        const id = req.params.id;
        const proveedor = await Proveedor.findByPk(id);

        if(!proveedor){
            return res.status(404).json({ error: "Proveedor no encontrado"});
        }
        const{pro_nombre,pro_telefono} = req.body;
        
        await proveedor.update({
        pro_nombre: pro_nombre ?? proveedor.pro_nombre,
        pro_telefono: pro_telefono ?? proveedor.pro_telefono,
        });
        res.json(proveedor);
    }catch(err){
        console.error("Error al actualizar proveedor: ", err);
        res.status(500).json({ error: "Error al actualizar proveedor"});
    }
    
}

//delete //DELETE/ proveedor/:id

async function deleteProveedor(req,res) {
    try{
        const filas = await Proveedor.destroy({
            where: { pro_nit: req.params.id},
        });

        if(filas === 0){
            return res.status(404).json({ error: "Proveedor no encontrado: "});
        }
        
        res.json({ mensaje: "Proveedor eliminado"});
    }catch(err){
        console.error("Error al eliminar proveedor:", err);
        res.status(500).json({ error: "Error al eliminar proveedor"});
    }   
}

module.exports ={
    getProveedores,
    getProveedoresById,
    createProveedores,
    updateProveedores,
    deleteProveedor,
};