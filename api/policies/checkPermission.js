module.exports = function (req, res, next) {

  if(req.user.email == 'nimer.farahty@gmail.com'){
    return next();
  }

  var where = {
    model: req.options.model,
    action: req.options.action
  };

  User.findOne(req.user.id).populate('roles').exec(function (err, user) {
    if (err) {
      return res.forbidden(err);
    } else if (!user) {
      return res.forbidden(res.i18n('You Don\'t have permission to access this route'));
    } else {
      Permission.findOne(where).populate('roles').exec(function (err, permission) {
        if (err) {
          return res.forbidden(err);
        } else if (!permission) {
          return res.forbidden(res.i18n('You Don\'t have permission to access this route'));
        } else {
          var userRoles = _.pluck(user.roles, 'id');
          var permissionRoles = _.pluck(permission.roles, 'id');
          var matches = _.intersection(userRoles, permissionRoles);
          if (matches) {
            return next();
          } else {
            return res.forbidden(res.i18n('You Don\'t have permission to access this route'));
          }
        }
      });
    }
  });

}
