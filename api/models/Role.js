module.exports = {
  schema : true,
  attributes: {
    name : {
      type : 'string',
      required : true
    },
    description :{
      type : 'string'
    },
    permissions :{
      collection : 'permission',
      via : 'roles'
    },
    users : {
      collection : 'user',
      via : 'roles'
    }
  }
};

