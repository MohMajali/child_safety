const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Services = require("./services");

const ServicesDates = sequelize.define(
  "services_dates",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    from_time: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    to_time: {
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

Services.hasMany(ServicesDates, {
  foreignKey: "service_id",
});
ServicesDates.belongsTo(Services, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "service_id",
});

module.exports = ServicesDates;
