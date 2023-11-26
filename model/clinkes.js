const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Location = require("./location");

const Clinks = sequelize.define(
  "clinks",
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

Location.hasMany(Clinks, {
  foreignKey: "location_id",
});
Clinks.belongsTo(Location, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "location_id",
});

module.exports = Clinks;
