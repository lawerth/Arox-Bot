const guilds = require("../../data/IDs/guilds.json");

module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$customGuildID",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [name] = data.inside.splits;
      
      if (name in guilds) data.result = guilds[name];
      else data.result = "";
      
      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $customGuildID
  Returns the ID of a custom guild from the data/IDs/guilds.json file.
  
  ### Usage:
  $customGuildID[name]
  
  ### Parameters:
  name | required | The name of the custom guild to return the ID for.
*/
