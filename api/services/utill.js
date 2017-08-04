var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
  createJWT: function (user) {
    delete user.password;
    var payload = {
      sub: user,
      iat: moment().unix(),
      exp: moment().add(1, 'h').unix()
    };
    //return jwt.encode(payload, sails.config.secret);
    return jwt.encode(payload, 'KGJGJHWDWDWXWcwcwc87w9c798w7c98bw78c97w9cwc');
  }
}
