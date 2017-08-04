var bcrypt = require('bcrypt');

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    birthday: {
      type: 'date'
    },
    password: {
      type: 'string'
    },
    roles: {
      collection: 'role',
      via: 'users'
    }
  },
  toJSON: function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  },
  beforeCreate: function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) return next(err);
        values.password = hash;
        next();
      })
    })
  },
  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};
