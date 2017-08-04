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
    roles :{
      collection : 'role',
      via : 'permissions'
    },
    model : {
      type : 'string',
    },
    action : {
      type: 'string'
    }
  }
};

