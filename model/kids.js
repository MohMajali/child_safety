const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = require("./user");

const Kid = sequelize.define(
  "kids",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    national_id: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Student-Images/userDefault.png",
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

User.hasMany(Kid, {
  foreignKey: "mother_id",
});
Kid.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "mother_id",
});

module.exports = Kid;
