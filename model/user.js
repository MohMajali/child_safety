const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const UserTypes = require("./user_type");

const User = sequelize.define(
  "users",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    image: {
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

UserTypes.hasMany(User, {
  foreignKey: "user_type_id",
});
User.belongsTo(UserTypes, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "user_type_id",
});

module.exports = User;
