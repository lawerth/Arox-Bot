module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$globalVarUsers",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [
        variable,
        returnType = "{username}",
        seperator = ", ",
        table = d.client.db.tables[0],
      ] = data.inside.splits;
  
      if (!d.client.variableManager.has(variable, table))
        return d.aoiError.fnError(d, "custom", {}, `Variable "${variable}" Not Found`);
  
      const result = [];
  
      let db = await d.client.db.all(table, (data) => {
        return (
          data.key.startsWith(variable.addBrackets() + "_") &&
          data.key.split("_").length === 2
        );
      });
  
      for (const lbdata of db) {
        const key = lbdata.key.split("_")[1];
        let user = await d.util.getUser(d, key);
        if (!user) continue;
  
        let formattedReturnType = returnType
          .replaceAll("{username}", user.username)
          .replaceAll("{displayName}", user?.displayName)
          .replaceAll("{id}", user.id)
          .replaceAll("{mention}", `<@${user.id}>`)
          .replaceAll("{tag}", `${user.username}#${user.discriminator}`);
  
        result.push(formattedReturnType);
      }
      data.result = result.join(seperator);

      return {
        code: d.util.setCode(data),
      };
    },
  });
};
  
/*
  ### $globalVarUsers
  Lists all users that have the specified global variable set (regardless of value).
  
  ### Usage:
  $globalVarUsers[variable;returnType?;seperator?;table?]
  
  ### Parameters:
  variable   | required                            | The global variable to check.
  returnType | optional (default: username)        | How to return the users. Available placeholders: {username}, {displayName}, {id}, {mention}, {tag}.
  seperator  | optional (default: ", ")            | The string that separates each user in the output.
  table      | optional (default: the first table) | The table where the variable is stored.
*/
  