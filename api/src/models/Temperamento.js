const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {  
  const Temperamento = sequelize.define('temperamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    temperament: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString(value) {
              if (typeof value !== 'string') {
                  throw new Error('Debe ser del tipo cadena de caracteres');
              }
          },
          isCapitalized(value) {
              if (value[0] !== value[0].toUpperCase()) {
                  throw new Error('La primer letra debe ser Mayúscula');
              }
          }
        }
      },    
    },)
    
};
