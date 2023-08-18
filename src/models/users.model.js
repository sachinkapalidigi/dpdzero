const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const Record = require("./records.model");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

User.hasMany(Record, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});
Record.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

module.exports = User;
