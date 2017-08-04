var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function (req, res, next) {
  
  if (!req.header('Authorization')) {
    return res.status(401).json({error : res.i18n('Please make sure your request has an Authorization header')});
  }
  var token = req.header('Authorization').split(' ')[1];
  var payload = null;
  try {
    //payload = jwt.decode(token, sails.config.secret);
    payload = jwt.decode(token, 'KGJGJHWDWDWXWcwcwc87w9c798w7c98bw78c97w9cwc');
  } catch (err) {
    return res.status(401).json({error : err.message});
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).json({error : res.i18n('Token has expired')});
  }
  req.user = payload.sub;
  return next();
}
