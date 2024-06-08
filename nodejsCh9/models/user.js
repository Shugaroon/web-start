const Sequelize = require('sequelize');
class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true, // true로 바꾸니 카카오 로그인됨.
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
              },

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
          });
    };

    static associate(db) {
        db.User.hasMany(db.Post);  // 1:N, 사용자 : N개의 글
        db.User.belongsToMany(db.User, { // 사용자: 타사용자Followers, N:M
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
          });
        db.User.belongsToMany(db.User, { // 사용자: 타사용자Followings, N:M
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
          });
    };

}

module.exports = User;