const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = require("./user");
const Clink = require("./clinkes");

const Services = sequelize.define(
  "services",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Services, {
  foreignKey: "doc_id",
});
Services.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "doc_id",
});

Clink.hasMany(Services, {
  foreignKey: "clink_id",
});
Services.belongsTo(Clink, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "clink_id",
});

module.exports = Services;
