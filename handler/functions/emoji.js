const emojis = require("../../data/emojis.json");

module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$emoji",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [emoji] = data.inside.splits;

      const keys = emoji.split(".");
      let value = emojis;

      for (const key of keys) {
        if (value && key in value) {
          value = value[key];
        } else {
          value = "🔴";
          break;
        }
      }
      data.result = value;

      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $emoji
  Returns the emoji value for a given key from the data/emojis.json file.
  
  ### Usage:
  $emoji[name]
  
  ### Parameters:
  name | required | The name of the emoji in the emojis.json file to return.
*/