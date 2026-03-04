const express = require("express");
const{
    getProveedores, 
    getProveedoresById, 
    createProveedores, 
    updateProveedores, 
    deleteProveedor,
} = require("../controllers/proveedoresController");

const router = express.Router();

router.get("/", getProveedores);
router.get("/:id", getProveedoresById);
router.post("/", createProveedores);
router.put("/:id", updateProveedores);
router.delete("/:id", deleteProveedor);

module.exports = router;