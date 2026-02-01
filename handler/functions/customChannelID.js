const channels = require("../../data/IDs/channels.json");

module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$customChannelID",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [name] = data.inside.splits;
      
      if (name in channels) data.result = channels[name];
      else data.result = "";

      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $customChannelID
  Returns the ID of a custom channel from the data/IDs/channels.json file.
  
  ### Usage:
  $customChannelID[name]
  
  ### Parameters:
  name | required | The name of the custom channel to return the ID for.
*/
