const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dog = sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isString(value) {
            if (typeof value !== 'string') {
                throw new Error('El campo nombre debe ser de tipo string');
            }
        },
        isCapitalized(value) {
            if (value[0] !== value[0].toUpperCase()) {
                throw new Error('La primera letra del nombre debe estar en mayúscula');
            }
        }
      }
    },    
    
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
            args: 1,
            msg: "El peso mínimo permitido es de 1 Kilogramo."
        },
        max: {
            args: 200,
            msg: "El peso máximo permitido es de 200 Kilogramos."
        }
    }
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
            args: 1,
            msg: "El peso mínimo permitido es de 1 Kilogramo."
        },
        max: {
            args: 200,
            msg: "El peso máximo permitido es de 200 Kilogramos."
        }
    }
    },
    height_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
              args: 10,
              msg: "La altura mínima permitida es de 10 Centímetros."
          },
          max: {
              args: 150,
              msg: "La Altura máxima permitida es de 150 Centímetros."
          }
        }
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
            args: 10,
            msg: "La altura mínima permitida es de 10 Centímetros."
        },
        max: {
            args: 150,
            msg: "La Altura máxima permitida es de 150 Centímetros."
        }
      }
  },
    life_span_min: {
      type: DataTypes.INTEGER,
      validate: {
          min: {
              args: 1,
              msg: "La edad mínima permitida es de 1 años."
          },
          max: {
              args: 30,
              msg: "La edad máxima permitida es de 30 años."
          }
      }
    },
    life_span_max: {
      type: DataTypes.INTEGER,
      validate: {
          min: {
              args: 1,
              msg: "La edad mínima permitida es de 1 años."
          },
          max: {
              args: 30,
              msg: "La edad máxima permitida es de 30 años."
          }
      }
    },
    image : {
      type: DataTypes.TEXT
    }
  });  
};
