'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uploaded_files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  uploaded_files.init({
    uploadedPath: DataTypes.STRING,
    fileName: DataTypes.STRING,
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'uploaded_files',
  });
  return uploaded_files;
};