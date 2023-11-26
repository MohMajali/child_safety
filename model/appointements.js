const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = require("./user");
const serviceDate = require("./services_dates");

const Appointments = sequelize.define(
  "appointments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true,
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

User.hasMany(Appointments, {
  foreignKey: "client_id",
  as: "clientAppointment",
});
Appointments.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "client_id",
  as: "clientAppointment",
});

User.hasMany(Appointments, {
  foreignKey: "doc_id",
  as: "DocAppointment",
});
Appointments.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "doc_id",
  as: "DocAppointment",
});

serviceDate.hasMany(Appointments, {
  foreignKey: "date_id",
});
Appointments.belongsTo(serviceDate, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "date_id",
});

module.exports = Appointments;
