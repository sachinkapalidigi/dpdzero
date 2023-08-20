const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");

// NOTE: user_id as foreign key is added automatically by Sequelize as the association is defined in models
const Record = sequelize.define(
  "record",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "key"],
      },
      {
        fields: ["key"],
      },
    ],
  }
);

module.exports = Record;
