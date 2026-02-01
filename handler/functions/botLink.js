const links = require("../../data/links.json");

module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$botLink",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [name] = data.inside.splits;
      
      if (name in links) data.result = links[name]; 
      else data.result = "https://example.com/";

      return { 
        code: d.util.setCode(data), 
      };
    },
  });
};

/*
  ### $botLink
  Returns the link for a specific bot name from the data/links.json file.
  
  ### Usage:
  $botLink[name]
  
  ### Parameters:
  name | required | The name of the bot to get the link for.
*/
