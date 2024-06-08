const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// join, login, logout 구현

exports.join = async (req, res, next) => {
    const { email, nick, password } = req.body;  // form에서 전달 받음
    try {
      const exUser = await User.findOne({ where: { email } }); // db에 있는지 조사
      if (exUser) {
        return res.redirect('/join?error=exist');
      }
      const hash = await bcrypt.hash(password, 12); // pw 암호화
      await User.create({ // db에 넣기
        email,
        nick,
        password: hash,
      });
      return res.redirect('/'); // 메인 페이지로 돌아감
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?error=${info.message}`);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  };


  exports.logout = (req, res) => {
    req.logout(() => {
      res.redirect('/');
    });
  };
  