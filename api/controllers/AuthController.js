/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'login': function (req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(403).json({error : res.i18n('username and password is required.')});
    }
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) {
        return res.status(403).json({error : err.message});
      } else if (!user) {
        return res.status(403).json({error : res.i18n('Username not available.')});
      } else {
        User.comparePassword(req.body.password, user, function (err, valid) {
          if (err) {
            return res.status(403).json({error : err.message});
          } else if (!valid) {
            return res.status(403).json({error : res.i18n('Invalid Password.')});
          } else {
            return res.json({
              user: user,
              token: utill.createJWT(user)
            });
          }
        });
      }
    });
  }
};
