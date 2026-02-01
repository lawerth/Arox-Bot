module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$isValidMath",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [equation] = data.inside.splits;

      try {
        if (!/^[0-9+\-*/().\s]+$/.test(equation)) {
          data.result = false;
        } else {
          const result = eval(equation);
          data.result = !isNaN(result);
        }
      } catch {
        data.result = false;
      }

      return {
        code: d.util.setCode(data),
      };
    },
  });
};

/*
  ### $isValidMath
  Checks if a given mathematical expression is valid.
  
  ### Usage:
  $isValidMath[equation]
  
  ### Parameters:
  equation | required | The mathematical expression to check.
*/
