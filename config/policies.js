module.exports.policies = {
  '*': ['isAuth' , 'checkPermission'],
  //'*' : false,
  'user' : {
    'create' : true
  } ,
  'auth' : {
    'login' : true
  }
};
