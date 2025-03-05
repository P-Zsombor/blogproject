const { Sequelize, DataTypes } = require("sequelize")

const dbHandler = new Sequelize("data", "root", "", { dialect: "mysql", host: "localhost" })

const Users = dbHandler.define("users", {
    "username":{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    "password":{
        type: DataTypes.STRING,
        allowNull: false
    },
    "admin":{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},{
    timestamps: false
})

const Posts = dbHandler.define("posts", {
    "postId":{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    "uploader":{
        type: DataTypes.STRING,
        allowNull: false
    },
    "content":{
        type: DataTypes.STRING,
        allowNull: false
    },
    "likes":{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
},{
    timestamps: false
})

const Comments = dbHandler.define("comments", {
    "commentId":{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    "postId":{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    "content":{
        type: DataTypes.STRING,
        allowNull: false
    },
    "likes":{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})

const Reports = dbHandler.define("reports", {
    "reportId":{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    "postId":{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    "content":{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})

exports.handler = dbHandler

exports.tables = { Users, Posts, Comments, Reports }
