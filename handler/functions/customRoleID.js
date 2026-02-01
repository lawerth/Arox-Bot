const roles = require("../../data/IDs/roles.json");

module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$customRoleID",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [name] = data.inside.splits;
      
      if (name in roles) data.result = roles[name];
      else data.result = "";
      
      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $customRoleID
  Returns the ID of a custom role from the data/IDs/roles.json file.
  
  ### Usage:
  $customRoleID[name]
  
  ### Parameters:
  name | required | The name of the custom role to return the ID for.
*/