module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$globalUsersWithVarValue",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [
        variable,
        checkValue,
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
        if (lbdata.value != checkValue) continue;
        const key = lbdata.key.split("_")[1];
        let user = await d.util.getUser(d, key);
        if (!user) continue;

        let formattedReturnType = returnType
          .replaceAll("{username}", user.username)
          .replaceAll("{displayName}", user?.displayName)
          .replaceAll("{id}", user.id)
          .replaceAll("{mention}", `<@${user.id}>`);

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
	### $globalUsersWithVarValue
	Returns the users who have the similar value in a (global user based) variable. 

	### Usage:
	$globalUsersWithVarValue[variable;checkValue;returnType?;seperator?;table?]`

	### Parameters:
	variable   | required                            | The variable which we are checking on. 
	checkValue | required (but can be kept empty)    | The value which we are matching. 
	returnType | optional (default: username)        | How the users should be returned. In their ids, username and so. Available Types: (username, displayName, id, tag and mention). 
	seperator  | optional (default: ", ")            | The seperator which will seperate the members. 
	table      | optional (default: the first table) | The table which the variable is in. 
*/
