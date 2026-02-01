const emojis = require("../../data/emojis.json");

module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$emojiID",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [emojiName] = data.inside.splits;

      if (emojis[emojiName]) {
        const match = emojis[emojiName].match(/<a?:.+:(\d+)>/);
        if (match) {
          const emojiId = match[1];
          data.result = emojiId;
        } else {
          data.result = emojis[emojiName];
        }
      } else {
        data.result = "0";
      }
      
      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $emojiID
  Returns the ID of a custom emoji from the data/emojis.json file.
  
  ### Usage:
  $emojiID[name]
  
  ### Parameters:
  name | required | The name of the emoji in the emojis.json file to return the ID for.
*/
