const rules = require("../../data/rules.json");

module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$botRulesText",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      let [lang] = data.inside.splits;
      if (!lang) lang = "en";

      const items = rules[lang];
      data.result = items
        .slice(0, -1)
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n\n") + (items.length > 1 ? "\n\n" : "") + items[items.length - 1];

      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $botRulesText
  Returns the rules for a specific language.
  
  ### Usage:
  $botRulesText[language?]

  ### Parameters:
  language   | optional (default: en) | The language of the rules to return.
*/
