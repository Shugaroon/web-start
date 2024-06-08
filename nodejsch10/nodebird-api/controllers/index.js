const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models');

exports.renderLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ // 사용자정보 db에 있는지 조회
      where: { id: req.user?.id || null }, // 사용자가 조회요청을 하면?
      include: { model: Domain },
    });
    res.render('login', { // 사용자 조회에 성공하면 login.html에서 안녕하세요 ..님 과 같이 표현해줌.
      user,
      domains: user?.Domains,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.createDomain = async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4(),
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
};