//conexión con sequelize
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

//conexión MYSQL desde env 
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql'
    }
);

//Tabla productos 
const Producto = sequelize.define(
    "Producto",
    {
        prod_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        prod_nombre: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        prod_descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        pro_nit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "productos",
        timestamps: false,
    }
);

//vista producto 
const VistaProducto = sequelize.define(
  "VistaProducto",
  {
    producto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    producto: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    pro_nit: DataTypes.INTEGER,   
    proveedor: DataTypes.STRING,
  },
  {
    tableName: "vw_productos",
    timestamps: false,
  }
);

//tabla proveedor 
const Proveedor = sequelize.define(
  "Proveedor",
  {
    pro_nit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pro_nombre: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    pro_telefono: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "proveedores",
    timestamps: false,
  }
);

//vista proveedor
const VistaProveedor = sequelize.define(
  "VistaProveedor",
  {
    proveedor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    proveedor: DataTypes.STRING,
    telefono_proveedor:DataTypes.STRING,
  },
  {
    tableName: "vw_proveedores",
    timestamps: false,
  }
);




module.exports = {
    sequelize,
    Producto,
    VistaProducto,
    Proveedor,
    VistaProveedor,     
};
