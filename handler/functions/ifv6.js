module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$ifv6",
    type: "djs",
    code: async (d) => arox.functionManager.cache.get("if").code(d),
  });
};

/*
  ### $ifv6
  It performs the same function as the existing $if function. It is for using both old if and v6 if in the same command.
  
  ### Usage:
  $ifv6[condition;trueValue;falseValue?]
  
  ### Parameters:
  condition  | required | The condition to check.
  trueValue  | required | The value to return if the condition is true.
  falseValue | optional | The value to return if the condition is false.
*/
