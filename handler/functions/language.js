module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$language",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [...a] = data.inside.splits;

      let res = "";
      let langu;

      if (data.language) langu = data.language;
      else langu = (await d.client.db.get(d.client.db.tables[1], "lang", d.author.id))?.value ?? "en";

      for (var b of a) {
        let [lang, ...then] = b.split(":");

        if (langu == lang) {
          res = then.join(":");
        }
      }
      data.result = res;

      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $language
  Returns the value of a language key for the user's current language.
  
  ### Usage:
  $language[lang1:text1;lang2:text2;...]
  
  ### Parameters:
  lang | required | The language key to retrieve.
  text | required | The text to return if the user's language matches the lang key.

  ### NOTE:
  It retrieves the language information from the variable named “lang”. If the lang variable does not exist or is not defined by the user, it returns “en” by default.
*/
