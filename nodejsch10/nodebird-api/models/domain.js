const Sequelize = require('sequelize'); 

class Domain extends Sequelize.Model { // 인터넷 주소
  static initiate(sequelize) {
    Domain.init({
      host: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('free', 'premium'),
        allowNull: false,
      },
      clientSecret: {
        type: Sequelize.UUID, // 클라이언트 비밀 키(다른 개발자들이 사용할때 필요, 유출주의)
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: 'domains',
    });
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};

module.exports = Domain;
